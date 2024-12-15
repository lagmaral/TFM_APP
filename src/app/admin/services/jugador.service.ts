import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/services/shared.service';
import { JugadorDTO } from '../models/jugador.dto';
import { PlantillaDTO } from '../models/plantilla.dto';

export interface AuthToken {
  user_id: string;
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class JugadorService {
  private urlApi: string;
  private controller: string;
  private sharedService: SharedService;
  constructor(private http: HttpClient, private injector: Injector) {
    this.sharedService = this.injector.get(SharedService);
    this.controller = 'jugador';
    this.urlApi = 'http://localhost:3000/pauldarrak/' + this.controller;
  }


  getPlayerById (id: number): Observable<JugadorDTO> {
    return this.http
    .get<JugadorDTO>(`${this.urlApi}/${id}`, {})
      .pipe(catchError(this.sharedService.handleError));
  }

  getPaginatedList(id: number, limit:number, filters: any): Observable<JugadorDTO[]> {
    let params = new HttpParams()
    .set('page', id === 0 ? 1 : id)//id)
    .set('limit', limit);
    // Convertir los filtros a JSON string
    if (filters) {
      params = params.set('filters', JSON.stringify(filters));
    }
    return this.http
    .get<JugadorDTO[]>(`${this.urlApi}/paginated`, { params })
      .pipe(catchError(this.sharedService.handleError));
  }

  deletePlayer(id: number): Observable<boolean> {
    return this.http
    .delete<boolean>(`${this.urlApi}/${id}` )
      .pipe(catchError(this.sharedService.handleError));
  }
  createPlayer(input: FormData): Observable<JugadorDTO> {
    return this.http
      .post<JugadorDTO>(this.urlApi, input)
      .pipe(catchError(this.sharedService.handleError));
  }

  modifyPlayer(id: number, input: FormData): Observable<JugadorDTO> {
    return this.http
    .put<JugadorDTO>(`${this.urlApi}/${id}`, input)
      .pipe(catchError(this.sharedService.handleError));
  }

  createPlayerTeam(input: PlantillaDTO): Observable<JugadorDTO> {
    return this.http
      .post<JugadorDTO>(`${this.urlApi}/plantilla`, input)
      .pipe(catchError(this.sharedService.handleError));
  }

  deletePlayerTeam(id: number): Observable<boolean> {
    return this.http
    .delete<boolean>(`${this.urlApi}/plantilla/${id}` )
      .pipe(catchError(this.sharedService.handleError));
  }

}
