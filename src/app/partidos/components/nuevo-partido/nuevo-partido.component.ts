import { Component, OnInit,Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { EquipoDTO } from 'src/app/admin/models/equipo.dto';
import { RivalDTO } from 'src/app/admin/models/rival.dto';
import { AppState } from 'src/app/app.reducers';

@Component({
  selector: 'app-nuevo-partido',
  templateUrl: './nuevo-partido.component.html',
  styleUrls: ['./nuevo-partido.component.scss'],
})
export class NuevoPartidoComponent  implements OnInit {

  teamId:number;
  origen:string;
  partidoForm: FormGroup;
  //nombre = new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(100)]);
  equipoRival = new FormControl('', [Validators.required, this.equipoRivalValidator()]);
  isLocal= new FormControl(false);
  isAmistoso= new FormControl(false);
  fechaHora= new FormControl('', Validators.required);
  rivales:RivalDTO[];
  team:EquipoDTO;
  ubicacion: any;  // Objeto con latitud y longitud de la ubicación seleccionada

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private navCtrl: NavController,
    //private googleMapsService: GoogleMapsService,
    ) {

      this.partidoForm = this.fb.group({
        isLocal: this.isLocal,
        isAmistoso: this.isAmistoso,
        equipoRival: this.equipoRival,
        fechaHora: this.fechaHora
        //equipoLocal: ['', Validators.required],
        /*equipoRival: ['', Validators.required],
        amistoso: [false],
        local: [true],
        fechaHora: ['', Validators.required],*/
      });

    }

  ngOnInit() {
    this.teamId = Number(this.route.snapshot.paramMap.get('id')) || 0;
    this.route.queryParamMap.subscribe(params => {
      this.origen = params.get('origen') || '';
    });
    this.store.select('admin').subscribe((admin) => {
      this.team = admin.loadedTeam;
      this.rivales = admin.catalogRivales;
    });
  }

  goBack() {
    this.router.navigate(['/matches', this.teamId], {
      queryParams: { origen: this.origen}
    });
    /*if(this.teamId >0){
      this.router.navigate(['/teams/plantilla', this.origen]);
    }else{
      //this.router.navigate(['/matches', this.equipo.id]);
    }*/

  }

  abrirMapa() {
    /*this.googleMapsService.openMap().then((ubicacion) => {
      this.ubicacion = ubicacion;  // Guardamos las coordenadas
    });*/
  }

  // Método para registrar el partido
  registrarPartido() {
    if (this.partidoForm.valid) {
      const partidoData = {
        ...this.partidoForm.value,
        ubicacion: this.ubicacion,
      };

      console.log('Datos del partido recogidos:');
      console.log(JSON.stringify(partidoData, null, 2));
      /*const partidoData = {
        ...this.partidoForm.value,
        ubicacion: this.ubicacion,  // Agregamos las coordenadas de ubicación
      };
      this.partidoService.registrarPartido(partidoData).then(() => {
        this.navCtrl.navigateBack('/partidos');  // Redirigimos a la lista de partidos
      });*/
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
