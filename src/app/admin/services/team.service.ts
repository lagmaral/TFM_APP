import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/services/shared.service';
import { StaffDTO } from '../models/staff.dto';
import { EquipoDTO } from '../models/equipo.dto';
import { PosicionDTO } from '../models/posicion.dto';

export interface AuthToken {
  user_id: string;
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private urlApi: string;
  private controller: string;
  private sharedService: SharedService;
  constructor(private http: HttpClient, private injector: Injector) {
    this.sharedService = this.injector.get(SharedService);
    this.controller = 'equipo';
    this.urlApi = 'http://localhost:3000/pauldarrak/' + this.controller;
  }


  getTeamById (id: number): Observable<EquipoDTO> {
    return this.http
    .get<EquipoDTO>(`${this.urlApi}/${id}`, {})
      .pipe(catchError(this.sharedService.handleError));
  }

  getPaginatedList(id: number, limit:number, filters: any): Observable<EquipoDTO[]> {
    let params = new HttpParams()
    .set('page', id === 0 ? 1 : id)//id)
    .set('limit', limit);

    // Convertir los filtros a JSON string
    if (filters) {
      params = params.set('filters', JSON.stringify(filters));
    }
    return this.http
    .get<EquipoDTO[]>(`${this.urlApi}/paginated`, { params })
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteTeam(id: number): Observable<boolean> {
    return this.http
    .delete<boolean>(`${this.urlApi}/${id}` )
      .pipe(catchError(this.sharedService.handleError));
  }
  createTeam(input: FormData): Observable<EquipoDTO> {
    return this.http
      .post<EquipoDTO>(this.urlApi, input)
      .pipe(catchError(this.sharedService.handleError));
  }

  modifyTeam(id: number, input: FormData): Observable<EquipoDTO> {
    return this.http
    .put<EquipoDTO>(`${this.urlApi}/${id}`, input)
      .pipe(catchError(this.sharedService.handleError));
  }

  changeTeamOrder(id: number | string, direccion: string): Observable<any> {
    return this.http
      .put<any>(`${this.urlApi}/cambiar-orden/${id}?direccion=${direccion}`, {})
      .pipe(catchError(this.sharedService.handleError));
  }

  getAllTeams (): Observable<EquipoDTO[]> {
    return this.http
    .get<EquipoDTO[]>(`${this.urlApi}/all/teams`, {})
      .pipe(catchError(this.sharedService.handleError));
  }

  getAllActiveTeams (): Observable<EquipoDTO[]> {
    return this.http
    .get<EquipoDTO[]>(`${this.urlApi}`, {})
      .pipe(catchError(this.sharedService.handleError));
  }


  getAllPosiciones (): Observable<PosicionDTO[]> {
    return this.http
    .get<PosicionDTO[]>(`${this.urlApi}/all/positions`, {})
      .pipe(catchError(this.sharedService.handleError));
  }


}
