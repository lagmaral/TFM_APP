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
  matches:Match[] = [];

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

    });

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
}
