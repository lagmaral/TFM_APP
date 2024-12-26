import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-nuevo-partido',
  templateUrl: './nuevo-partido.component.html',
  styleUrls: ['./nuevo-partido.component.scss'],
})
export class NuevoPartidoComponent  implements OnInit {

  teamId:number;
  origen:string;
  partidoForm: FormGroup;
  equipos = [];  // Lista de equipos del usuario
  rivales = [];  // Lista de rivales (obtenidos desde otra entidad)
  ubicacion: any;  // Objeto con latitud y longitud de la ubicación seleccionada

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private navCtrl: NavController,
    //private googleMapsService: GoogleMapsService,
    ) {

      this.partidoForm = this.fb.group({
        equipoLocal: ['', Validators.required],
        equipoRival: ['', Validators.required],
        amistoso: [false],
        local: [true],
        fechaHora: ['', Validators.required],
      });

    }

  ngOnInit() {
    this.teamId = Number(this.route.snapshot.paramMap.get('id')) || 0;
    this.route.queryParamMap.subscribe(params => {
      this.origen = params.get('origen') || '';
    });
       // Aquí cargaríamos los equipos y rivales
       this.equipos = [ /* Lista de equipos del usuario */ ];
       this.rivales = [ /* Lista de rivales desde otra entidad */ ];
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
    /*if (this.partidoForm.valid) {
      const partidoData = {
        ...this.partidoForm.value,
        ubicacion: this.ubicacion,  // Agregamos las coordenadas de ubicación
      };
      this.partidoService.registrarPartido(partidoData).then(() => {
        this.navCtrl.navigateBack('/partidos');  // Redirigimos a la lista de partidos
      });
    }*/
  }

}
