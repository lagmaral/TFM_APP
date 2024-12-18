import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as TeamActions from '../../actions';
import { EquipoDTO } from 'src/app/admin/models/equipo.dto';
import { Card } from '../../models/card.interface';
@Component({
  selector: 'app-equipos-list',
  templateUrl: './equipos-list.component.html',
  styleUrls: ['./equipos-list.component.scss'],
})
export class EquiposListComponent  implements OnInit {


  cards: Card[] = [
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

  filteredCards: Card[] = [];
  filterText: string = ''; // El texto del filtro
  constructor( private store: Store<AppState> ) { }

  ngOnInit() {
      this.store.dispatch(TeamActions.searchActiveTeams());
  }

  ngAfterViewInit(): void {
    this.store.select('team').subscribe((team) => {
      //this.teamList = team.teamList;
      this.cards = team.teamList.map((item: EquipoDTO) => ({
        image: {
          default: item.internalkey+'-400.webp',
          srcset: `
          http://localhost:3000${item.internalkey}-400.webp 400w,
        `,
        sizes: '(max-width: 400px) 100vw, (max-width: 800px) 50vw, 33vw',
        },
        nombre: item.nombre,
        categoria: item.descripcion,
      }));
      this.filteredCards = this.cards;
    });
  }

  onCardClick(card: any) {
    console.log('Card clicked:', card);
    // Aquí puedes ejecutar una acción específica al hacer clic en una tarjeta
  }

  applyFilter() {
    console.log('Texto del filtro:', this.filterText.toLowerCase());

    this.filteredCards = this.cards.filter(card => {
      const nombreMatch = card.nombre.toLowerCase().includes(this.filterText.toLowerCase());
      const categoriaMatch = card.categoria.toLowerCase().includes(this.filterText.toLowerCase());

      console.log(`Card: ${card.nombre}, Nombre match: ${nombreMatch}, Categoria match: ${categoriaMatch}`);

      return nombreMatch || categoriaMatch;
    });

    console.log('Número de tarjetas filtradas:', this.filteredCards.length);
  }
}
