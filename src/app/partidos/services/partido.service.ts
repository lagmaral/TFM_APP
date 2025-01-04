import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

import { SharedService } from 'src/app/shared/services/shared.service';
import { PartidoDTO } from '../models/partido.dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PartidoService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'partido';
    this.urlApi = environment.apiUrl+'/pauldarrak/' + this.controller;
  }

  getPartidoById(id: number): Observable<PartidoDTO> {
    return this.http
      .get<PartidoDTO>(`${this.urlApi}/${id}`)
      .pipe(catchError(this.sharedService.handleError));
  }

  getPartidosUltimosSeteDias(): Observable<PartidoDTO[]> {
    return this.http
    .get<PartidoDTO[]>(`${this.urlApi}`)
    .pipe(catchError(this.sharedService.handleError));
  }

  getPartidosByEquipoId(equipoId: number): Observable<PartidoDTO[]> {
    console.log('Serivce: '+`${this.urlApi}/team/${equipoId}`)
    return this.http
    .get<PartidoDTO[]>(`${this.urlApi}/team/${equipoId}`)
    .pipe(catchError(this.sharedService.handleError));;
  }

  createPartido(partido: PartidoDTO): Observable<PartidoDTO> {
    return this.http
    .post<PartidoDTO>(this.urlApi, partido)
    .pipe(catchError(this.sharedService.handleError));;
  }

  updatePartido(id: number, partido: PartidoDTO): Observable<PartidoDTO> {
    return this.http
    .put<PartidoDTO>(`${this.urlApi}/${id}`, partido)
    .pipe(catchError(this.sharedService.handleError));;
  }

  deletePartido(id: number): Observable<void> {
    return this.http
    .delete<void>(`${this.urlApi}/${id}`)
    .pipe(catchError(this.sharedService.handleError));;
  }

  updateGoals(id: number, goleslocal: number, golesvisitante: number): Observable<PartidoDTO> {
    return this.http
    .put<PartidoDTO>(`${this.urlApi}/${id}/goals`, { goleslocal, golesvisitante })
    .pipe(catchError(this.sharedService.handleError));;
  }

}
