import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EquipoStaffDTO } from 'src/app/admin/models/equipo-staff.dto';
import { EquipoDTO } from 'src/app/admin/models/equipo.dto';
import { PlantillaDTO } from 'src/app/admin/models/plantilla.dto';
import { AppState } from 'src/app/app.reducers';

@Component({
  selector: 'app-equipo-plantilla',
  templateUrl: './equipo-plantilla.component.html',
  styleUrls: ['./equipo-plantilla.component.scss'],
})
export class EquipoPlantillaComponent  implements OnInit {

  origen:string='';
  constructor(private store: Store<AppState>,
        private router: Router,
        private route: ActivatedRoute
  ) { }

  equipo : EquipoDTO = new EquipoDTO(0,0,'','',0,false,'');
  staffList: EquipoStaffDTO[] = [];
  playerList: PlantillaDTO[] = [];
  ngOnInit() {
  }

  ngAfterViewInit(): void {

    this.store.select('team').subscribe((team) => {
      this.equipo = team.plantilla.equipo;
      this.staffList = team.plantilla.staff;
      this.playerList = team.plantilla.jugadores;
    });
    this.route.paramMap.subscribe(params => {
      this.origen = params.get('origen') || ''; // Obtiene el parámetro de la ruta
    });
    // Forzar detección de cambios
    //this.cd.detectChanges();
  }

  openDetailStaff(item: EquipoStaffDTO) {
    this.router.navigate(['/teams/detalleStaff', item.idstaff]);
  }

  openDetailPlayer(item: PlantillaDTO) {
    this.router.navigate(['/teams/detalleJugador', item.idjugador]);
  }

  goBack() {
    if(this.origen === 'Home')
      this.router.navigate(['/home']); // Ejemplo de navegación manual
    else
      this.router.navigate(['/teams']); // Ejemplo de navegación manual
  }
}
