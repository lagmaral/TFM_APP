import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  partidoList:PartidoDTO[] = []
  items = [
    { title: 'Card 1', content: 'This is the content for Card 1' },
    { title: 'Card 2', content: 'This is the content for Card 2' },
    { title: 'Card 3', content: 'This is the content for Card 3' },
    { title: 'Card 1', content: 'This is the content for Card 1' },
    { title: 'Card 2', content: 'This is the content for Card 2' },
    { title: 'Card 3', content: 'This is the content for Card 3' },
    { title: 'Card 1', content: 'This is the content for Card 1' },
    { title: 'Card 2', content: 'This is the content for Card 2' },
    { title: 'Card 3', content: 'This is the content for Card 3' },
    { title: 'Card 1', content: 'This is the content for Card 1' },
    { title: 'Card 2', content: 'This is the content for Card 2' },
    { title: 'Card 3', content: 'This is the content for Card 3' },
    { title: 'Card 1', content: 'This is the content for Card 1' },
    { title: 'Card 2', content: 'This is the content for Card 2' },
    { title: 'Card 3', content: 'This is the content for Card 3' },
    { title: 'Card 1', content: 'This is the content for Card 1' },
    { title: 'Card 2', content: 'This is the content for Card 2' },
    { title: 'Card 3', content: 'This is the content for Card 3' },
    // Añade más elementos según sea necesario
  ];

  matches:Match[] = [];


  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

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

      //this.teamList = team.teamList;
      /*this.cards = team.teamList.map((item: EquipoDTO) => ({
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
      this.updateVisibleCards();*/
    });
    // Forzar detección de cambios
    //this.cd.detectChanges();*/
  }

  scrollLeft() {
    const element = this.scrollContainer.nativeElement as HTMLElement;
    element.scrollBy({ left: -200, behavior: 'smooth' }); // Ajusta -200 según el ancho de las tarjetas
  }

  scrollRight() {
    const element = this.scrollContainer.nativeElement as HTMLElement;
    element.scrollBy({ left: 200, behavior: 'smooth' }); // Ajusta 200 según el ancho de las tarjetas
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
        date: this.datePipe.transform(data.fecha, 'dd/MM/yyyy HH:mm:ss') || ''//data.date || new Date().toISOString()
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
        date: this.datePipe.transform(data.fecha, 'dd/MM/yyyy HH:mm:ss') || ''//data.date || new Date().toISOString()
      };
    }


  }
}
