import { Component, OnInit,Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { RivalDTO } from 'src/app/admin/models/rival.dto';
import { AppState } from 'src/app/app.reducers';
import * as L from 'leaflet';
import { MapaModalComponent } from '../mapa/mapa.component';
import { PartidoDTO } from '../../models/partido.dto';
import * as PartidoActions from '../../actions';

@Component({
  selector: 'app-nuevo-partido',
  templateUrl: './nuevo-partido.component.html',
  styleUrls: ['./nuevo-partido.component.scss'],
})
export class NuevoPartidoComponent  implements OnInit {

  isEditMode = false;
  teamId:number;
  origen:string;
  partidoForm: FormGroup;
  equipoRival = new FormControl('', [Validators.required, this.equipoRivalValidator()]);
  campo = new FormControl('', [Validators.required]);
  isLocal= new FormControl(false);
  isAmistoso= new FormControl(false);
  fechaHora= new FormControl('', Validators.required);
  descripcion = '';
  rivales:RivalDTO[];
  ubicacion: any;  // Objeto con latitud y longitud de la ubicación seleccionada
  map: L.Map;
  matchId = 0;
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalController: ModalController
    ) {

      this.partidoForm = this.fb.group({
        isLocal: this.isLocal,
        isAmistoso: this.isAmistoso,
        equipoRival: this.equipoRival,
        fechaHora: this.fechaHora,
        campo:this.campo
      });

    }

  ngOnInit() {
    if (this.router.url.includes('modify')) {
      this.isEditMode = true;
    }else{
      this.teamId = Number(this.route.snapshot.paramMap.get('id')) || 0;
      this.partidoForm.reset();
      this.store.dispatch(PartidoActions.getMatchDetailBack());
      //console.log('CASO 1: '+this.teamId);
    }

    this.route.queryParamMap.subscribe(params => {
      this.origen = params.get('origen') || '';
    });
    this.store.select('admin').subscribe((admin) => {
      this.rivales = admin.catalogRivales;
    });

    this.store.select('partido').subscribe((partido) => {

      this.matchId = partido.loadedPartido.id;
      this.partidoForm.get('equipoRival')?.setValue(partido.loadedPartido.idrival);
      this.partidoForm.get('isLocal')?.setValue(partido.loadedPartido.local);
      this.partidoForm.get('isAmistoso')?.setValue(partido.loadedPartido.amistoso);
      this.partidoForm.get('fechaHora')?.setValue(partido.loadedPartido.fecha);

      this.partidoForm.get('campo')?.setValue(partido.loadedPartido.campo);
      this.ubicacion = partido.loadedPartido.coordenadas;
      this.descripcion = partido.loadedPartido.descripcion;
      if(partido.loadedPartido.idequipo){
        this.teamId = partido.loadedPartido.idequipo;
        //console.log('CASO 2: '+this.teamId);
      }


    });
  }

  goBack() {
    this.store.dispatch(PartidoActions.getMatchDetailBack());

    this.router.navigate(['/matches', this.teamId], {
      queryParams: { origen: this.origen}
    });


  }

  async  abrirMapa() {
    const modal = await this.modalController.create({
      component: MapaModalComponent
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.ubicacion = data;
      // Aquí puedes implementar la lógica para guardar en tu BD
    }
  }


  navegarConWaze() {
    if (this.ubicacion) {
      const url = `https://www.waze.com/ul?ll=${this.ubicacion.lat},${this.ubicacion.lng}&navigate=yes`;
      window.open(url, '_blank');
    }
  }

  // Método para registrar el partido
  registrarPartido() {
    //console.log('CLICK');
    if (this.partidoForm.valid) {
      const dto = new PartidoDTO();
      dto.idrival = this.partidoForm.get('equipoRival')?.value;
      dto.local = this.partidoForm.get('isLocal')?.value;
      dto.amistoso = this.partidoForm.get('isAmistoso')?.value;
      dto.fecha = this.partidoForm.get('fechaHora')?.value;
      dto.coordenadas = JSON.stringify(this.ubicacion);
      dto.campo = this.partidoForm.get('campo')?.value;
      dto.descripcion = this.ubicacion.nombre;
      dto.idequipo = this.teamId;
      //console.log('CASO 3: '+this.teamId);
      //console.log('Datos del partido recogidos:');
      //console.log(JSON.stringify(dto, null, 2));
      if(this.isEditMode){
        dto.id = this.matchId
        this.store.dispatch(PartidoActions.modifyMatch({item:dto}));
      }else{
        this.store.dispatch(PartidoActions.saveNewMatch({item:dto}));
      }

      this.goBack();
    }else{
      console.log('TIENE ERRORES:');
      console.log(this.partidoForm.value);
      Object.keys(this.partidoForm.controls).forEach(key => {
        const control = this.partidoForm.get(key);
        if (control && control.invalid) {
          console.log(`Campo ${key} inválido. Errores:`, control.errors);
        }else{
          console.log('CONTROL NULL??')
        }
      });
    }
  }

   equipoRivalValidator(): ValidatorFn {

    return (control: AbstractControl): {[key: string]: any} | null => {
      const selectedId = control.value;
      if (selectedId === undefined || selectedId <= 0) {
        return { 'invalidEquipoRival': true };
      }
      return null;
    };
  }

  getErrorMessage(control: AbstractControl, field: string): string {
    if (control.hasError('required')
    || control.hasError('invalidEquipoRival') ) {
      return `ERRORS.${field}.REQUIRED`;
    }
    if (control.hasError('minlength')) {
      return `ERRORS.${field}.MIN_LENGTH`;
    }
    if (control.hasError('maxlength')) {
      return `ERRORS.${field}.MAX_LENGTH`;
    }
    if (control.hasError('pattern') && field === 'TELEFONO') {
      return `ERRORS.PHONE.INVALID`;
    }
    if (control.hasError('minimumAge')) {
      return `ERRORS.BIRTHDATE.MIN_AGE`;
    }
    if (control.hasError('invalidDateFormat')) {
      return `ERRORS.BIRTHDATE.INVALID_FORMAT`;
    }
    return '';
  }

}
