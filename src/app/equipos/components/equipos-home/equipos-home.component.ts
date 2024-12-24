import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EquipoDTO } from 'src/app/admin/models/equipo.dto';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { register } from 'swiper/element/bundle';
import * as TeamActions from '../../actions';
import { Card } from '../../models/card.interface';
import { Router } from '@angular/router';
import { IonicSlides } from '@ionic/angular';
register();

@Component({
  selector: 'app-equipos-home',
  templateUrl: './equipos-home.component.html',
  styleUrls: ['./equipos-home.component.scss'],

})
export class EquiposHomeComponent  implements OnInit {
  visibleCards: Card[];
  currentScreenSize = '';
  cards : Card[] = [
      {
        id:0,
        image: {
          default: '', // Imagen por defecto
          srcset: ``,
          sizes: '',
        },
        nombre: '',
        categoria: '',
      }
    ];
  constructor( private store: Store<AppState> ,
    //private cd: ChangeDetectorRef,
    private router: Router) { }

  ngOnInit() {
      this.store.dispatch(TeamActions.searchActiveTeams());
  }

  ngAfterViewInit(): void {
    this.store.select('team').subscribe((team) => {
      //this.teamList = team.teamList;
      this.cards = team.teamList.map((item: EquipoDTO) => ({
        id:item.id,
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
      this.updateVisibleCards();
    });
    // Forzar detección de cambios
    //this.cd.detectChanges();*/
  }



  onCardClick(id: number) {
   // console.log('Card clicked:', id);
    this.store.dispatch(TeamActions.getStaffTeamsById({id}));
    //this.router.navigate(['/teams/plantilla']);
     this.router.navigate(['/teams/plantilla', 'Home']);
  }

  updateVisibleCards() {
    const screenWidth = window.innerWidth;
    let numberOfCardsToShow = 1; // Default: móvil (1 tarjeta)

    if (screenWidth >= 768 && screenWidth < 1024) {
      numberOfCardsToShow = 2; // Tablet (2 tarjetas)
    } else if (screenWidth >= 1024) {
      numberOfCardsToShow = 3; // Escritorio (3 tarjetas)
    }

    this.visibleCards = this.getRandomCards(numberOfCardsToShow);
  }

  // Obtener tarjetas aleatorias según el número solicitado
  getRandomCards(numberOfCards: number) {
    const shuffled = [...this.cards].sort(() => 0.5 - Math.random()); // Mezclar las tarjetas
    return shuffled.slice(0, numberOfCards); // Seleccionar las primeras "n" tarjetas
  }

}
