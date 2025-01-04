import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { PartidoDTO } from '../../models/partido.dto';
import * as PartidoActions from '../../actions';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss'],
})
export class ResultadoComponent  implements OnInit {

  baseURL = environment.apiUrl;
  matchId:number = 0;
  teamId: number =0;
  origen:string;
  partido :PartidoDTO;
  golesLocal: number = 0;
  golesVisitante: number = 0;
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,){

    }

    ngOnInit() {

      this.matchId = Number(this.route.snapshot.paramMap.get('id')) || 0;


      this.route.queryParamMap.subscribe(params => {
        this.origen = params.get('origen') || '';
      });

      this.store.select('partido').subscribe((partido) => {
        this.teamId = partido.loadedPartido.idequipo;
        this.matchId = partido.loadedPartido.id;
        this.partido = partido.loadedPartido;
        if(partido.loadedPartido.goleslocal)
          this.golesLocal = partido.loadedPartido.goleslocal;
        if(partido.loadedPartido.golesvisitante)
          this.golesVisitante = partido.loadedPartido.golesvisitante;
      });
    }
  // Incrementar goles del equipo local
  incrementarGolesLocal() {
    this.golesLocal++;
  }

  // Decrementar goles del equipo local
  decrementarGolesLocal() {
    if (this.golesLocal > 0) {
      this.golesLocal--;
    }
  }

  // Incrementar goles del equipo visitante
  incrementarGolesVisitante() {
    this.golesVisitante++;
  }

  // Decrementar goles del equipo visitante
  decrementarGolesVisitante() {
    if (this.golesVisitante > 0) {
      this.golesVisitante--;
    }
  }

  // Guardar resultados
  guardarResultados() {
    const dto = { ...this.partido };
    dto.id = this.partido.id;
    dto.goleslocal = this.golesLocal;
    dto.golesvisitante = this.golesVisitante;
    this.store.dispatch(PartidoActions.modifyMatchGoal({item:dto}));
    this.goBack();
  }

  goBack() {
    this.router.navigate(['/matches', this.teamId], {
      queryParams: { origen: this.origen}
    });


  }

}
