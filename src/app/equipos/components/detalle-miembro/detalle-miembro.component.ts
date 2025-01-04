import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleEquipo } from '../../models/detalle.interface';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { EquipoDTO } from 'src/app/admin/models/equipo.dto';
import { EquipoStaffDTO } from 'src/app/admin/models/equipo-staff.dto';
import { PlantillaDTO } from 'src/app/admin/models/plantilla.dto';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-detalle-miembro',
  templateUrl: './detalle-miembro.component.html',
  styleUrls: ['./detalle-miembro.component.scss'],
})
export class DetalleMiembroComponent  implements OnInit {

  baseURL = environment.apiUrl;
  detalleInfo: DetalleEquipo;
  equipo : EquipoDTO = new EquipoDTO(0,0,'','',0,false,'');
  staffList: EquipoStaffDTO[] = [];
  playerList: PlantillaDTO[] = [];




  constructor(private route: ActivatedRoute,
    private store: Store<AppState>,
            private router: Router,
  ) { }

  ngAfterViewInit(): void {
    console.log('on ngAfterViewInit');

    // Forzar detección de cambios
    //this.cd.detectChanges();
  }

  ngOnInit() {

    console.log('on Init');
    this.store.select('team').subscribe((team) => {
      this.equipo = team.plantilla.equipo;
      this.staffList = team.plantilla.staff;
      this.playerList = team.plantilla.jugadores;
    });

    const id = Number(this.route.snapshot.paramMap.get('id')) || 0;
    const url = this.route.snapshot.url[0].path;

    if (url === 'detalleStaff') {
      const detail = this.findStaffById(id);
      if(detail)
        this.detalleInfo = this.cargarDetalleStaff(detail);
    } else if (url === 'detalleJugador') {
      const detail = this.findJugadorById(id);
      if(detail)
        this.detalleInfo = this.cargarDetalleJugador(detail);
    }
  }
  findStaffById(id: number): EquipoStaffDTO | undefined {
    return this.staffList.find(item => item.staff.id === id);
  }

  findJugadorById(id: number): PlantillaDTO | undefined {
    return this.playerList.find(item => item.idjugador === id);
  }

  cargarDetalleStaff(objeto: EquipoStaffDTO): DetalleEquipo {

    const output = {
      nombreEquipo: objeto.equipo.nombre || '',
      categoriaEquipo: objeto.equipo.descripcion || '',
      nombre: objeto.staff.nombre || '',
      apellido1: objeto.staff.apellido1 || '',
      apellido2: objeto.staff.apellido2 || '',
      dorsal: '',
      posicion: objeto.cargo.nombre.toUpperCase()|| '',
      imagen: {
        src: objeto.staff.internalkey || 'assets/default-avatar.png',
        srcset: objeto.staff.internalkey
      },
      descripcion: ''
    };
    console.log(output);
    return output;
  }

  cargarDetalleJugador(objeto: PlantillaDTO): DetalleEquipo {

    return {
      nombreEquipo: objeto.equipo.nombre || '',
      categoriaEquipo: objeto.equipo.descripcion || '',
      nombre: objeto.jugador.nombre || '',
      apellido1: objeto.jugador.apellido1 || '',
      apellido2: objeto.jugador.apellido2 || '',
      dorsal: (objeto.dorsal || '').toString().padStart(2, ' '),
      posicion:objeto.jugador.posicionDescription|| '',
      imagen: {
        src: objeto.jugador.internalkey || 'assets/default-avatar.png',
        srcset: objeto.jugador.internalkey
      },
      descripcion: objeto.jugador.descripcion || ''
    };
  }

  goBack() {
    this.router.navigate(['/teams/plantilla', 'List']);
  }

  getSrcSet(internalkey: string | undefined): string {
    if (!internalkey) return '';
    return `
      ${environment.apiUrl}${internalkey}-400.webp 400w,
      ${environment.apiUrl}${internalkey}-800.webp 800w,
    `;
  }


}
