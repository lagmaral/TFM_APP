import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EquipoDTO } from 'src/app/admin/models/equipo.dto';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { register } from 'swiper/element/bundle';
import * as TeamActions from '../../actions';
import { Card } from '../../models/card.interface';
register();

@Component({
  selector: 'app-equipos-home',
  templateUrl: './equipos-home.component.html',
  styleUrls: ['./equipos-home.component.scss'],

})
export class EquiposHomeComponent  implements OnInit {

  cards : Card[] = [
      {
        image: {
          default: '', // Imagen por defecto
          srcset: ``,
          sizes: '',
        },
        nombre: '',
        categoria: '',
      }
    ];
  constructor( private store: Store<AppState> , private cd: ChangeDetectorRef) { }

  ngOnInit() {
      this.store.dispatch(TeamActions.searchActiveTeams());
  }

  ngAfterViewInit(): void {
    this.store.select('team').subscribe((team) => {
      //this.teamList = team.teamList;
      this.cards = team.teamList.map((item: EquipoDTO) => ({
        image: {
          default: item.internalkey+'-1200.webp',
          srcset: `
          http://localhost:3000${item.internalkey}-400.webp 400w,
          http://localhost:3000${item.internalkey}-800.webp 800w,
          http://localhost:3000${item.internalkey}-1200.webp 1200w
        `,
        sizes: '(max-width: 400px) 100vw, (max-width: 800px) 50vw, 33vw',
        },
        nombre: item.nombre,
        categoria: item.descripcion,
      }));
    });
    // Forzar detección de cambios
    this.cd.detectChanges();
  }

}
