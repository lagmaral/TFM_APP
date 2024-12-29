import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as PartidoActions from '../../../partidos/actions';
import { PartidoDTO } from 'src/app/partidos/models/partido.dto';
import { Match } from '../../models/match.interface';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-resultados-home',
  templateUrl: './resultados-home.component.html',
  styleUrls: ['./resultados-home.component.scss'],
})
export class ResultadosHomeComponent  implements OnInit {

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  partidoList:PartidoDTO[] = []
  matches:Match[] = [];
  matchesScreen: Match[] = [];
  scrollAnimation!: number;
  constructor(private store: Store<AppState>,
    private datePipe: DatePipe
  ) {  }

  ngOnInit() {
      this.store.dispatch(PartidoActions.getLast7DaysMatches());
  }

 ngAfterViewInit(): void {
    this.store.select('partido').subscribe((partido) => {
      this.partidoList = partido.partidosList;
      this.matches = Array.from(this.partidoList , (item) => this.transformToMatch(item));
      const isLargeScreen = window.innerWidth > 1280;
      if(isLargeScreen)
        this.matchesScreen = [...this.matches, ...this.matches];
      else{
        this.matchesScreen = [...this.matches];
      }
      /*this.matches = Array.from({ length: 5 }, () =>
        this.partidoList.map(item => this.transformToMatch(item))
      ).flat();*/
      setTimeout(() => {
        this.startAnimationOnLargeScreens();
      }, 1000); // Espera el siguiente ciclo de renderizado
    });


  }

  @HostListener('window:resize')
  onResize() {
    this.startAnimationOnLargeScreens();
  }

  transformToMatch(data: PartidoDTO): Match {

    if(data.local){
      return {

        localTeam: {
          icon: 'http://localhost:3000'+data.equipoicon,
          name: data.equipo.nombre+' '+data.equipo.descripcion,
          score: data.goleslocal ? data.goleslocal+'' : ' - '
        },
        visitorTeam: {
          icon: 'http://localhost:3000'+data.rival.image,
          name: data.rival.nombre,
          score: data.golesvisitante ? data.golesvisitante+'' : ' - '
        },
        date: this.datePipe.transform(data.fecha, 'dd/MM/yyyy HH:mm') || ''//data.date || new Date().toISOString()
      };
    }else{
      return {

        localTeam: {
          icon: 'http://localhost:3000'+data.rival.image,
          name: data.rival.nombre,
          score: data.goleslocal ? data.goleslocal+'' : ' - '
        },
        visitorTeam: {
          icon: 'http://localhost:3000'+data.equipoicon,
          name: data.equipo.nombre+' '+data.equipo.descripcion,
          score: data.golesvisitante ? data.golesvisitante+'' : ' - '
        },
        date: this.datePipe.transform(data.fecha, 'dd/MM/yyyy HH:mm') || ''//data.date || new Date().toISOString()
      };
    }


  }

  startAnimationOnLargeScreens() {
    if (!this.scrollContainer || !this.scrollContainer.nativeElement) {
      return;
    }

    const scrollContainer = this.scrollContainer.nativeElement;
    const isLargeScreen = window.innerWidth > 1280;

    // Detener cualquier animación previa
    cancelAnimationFrame(this.scrollAnimation);

    if (isLargeScreen) {
      this.animateLoopScroll(scrollContainer);
    } else {
      scrollContainer.scrollLeft = 0; // Reiniciar el scroll si la pantalla es pequeña
    }
  }

  animateLoopScroll(container: HTMLElement) {
    const scrollStep = 1; // Velocidad del desplazamiento
    const maxScrollLeft = container.scrollWidth / 2; // Máximo desplazamiento para el bucle (mitad del contenedor original)

    const scroll = () => {
      container.scrollLeft += scrollStep;

      // Si ha llegado al final de la primera mitad, reiniciar al principio
      if (container.scrollLeft >= maxScrollLeft) {
        container.scrollLeft = 0;
      }

      // Continuar la animación
      this.scrollAnimation = requestAnimationFrame(scroll);
    };

    // Iniciar la animación
    this.scrollAnimation = requestAnimationFrame(scroll);
  }



}
