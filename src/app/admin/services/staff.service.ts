import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/services/shared.service';
import { StaffDTO } from '../models/staff.dto';
import { CargoDTO } from '../models/cargo.dto';
import { EquipoStaffDTO } from '../models/equipo-staff.dto';

export interface AuthToken {
  user_id: string;
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  private urlApi: string;
  private controller: string;
  private sharedService: SharedService;
  constructor(private http: HttpClient, private injector: Injector) {
    this.sharedService = this.injector.get(SharedService);
    this.controller = 'staff';
    this.urlApi = 'http://localhost:3000/pauldarrak/' + this.controller;
  }

  createStaffMember(staff: FormData): Observable<StaffDTO> {
    return this.http
      .post<StaffDTO>(this.urlApi, staff)
      .pipe(catchError(this.sharedService.handleError));
  }

  createStaffTeam(staff: EquipoStaffDTO): Observable<StaffDTO> {
    return this.http
      .post<StaffDTO>(this.urlApi+'/equipo', staff)
      .pipe(catchError(this.sharedService.handleError));
  }

  getStaffMemberById (id: number): Observable<StaffDTO> {
    return this.http
    .get<StaffDTO>(`${this.urlApi}/${id}`, {})
      .pipe(catchError(this.sharedService.handleError));
  }

  modifyStaffMember(id: number, staff: FormData): Observable<StaffDTO> {
    return this.http
    .put<StaffDTO>(`${this.urlApi}/${id}`, staff)
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteStaffMember(id: number): Observable<boolean> {
    return this.http
    .delete<boolean>(`${this.urlApi}/${id}` )
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteStaffTeambyId(id: number): Observable<boolean> {
    return this.http
    .delete<boolean>(`${this.urlApi}/equipo/${id}` )
      .pipe(catchError(this.sharedService.handleError));
  }

  getPaginatedList(id: number, limit:number, filters: any): Observable<StaffDTO[]> {

    let params = new HttpParams()
    .set('page', id === 0 ? 1 : id)//id)
    .set('limit', limit);

    // Convertir los filtros a JSON string
    if (filters) {
      params = params.set('filters', JSON.stringify(filters));
    }
    return this.http
    .get<StaffDTO[]>(`${this.urlApi}/paginated`, { params })
      .pipe(catchError(this.sharedService.handleError));
  }

  getAllCargos (): Observable<CargoDTO[]> {
    return this.http
    .get<CargoDTO[]>(`${this.urlApi}/all/cargos`, {})
      .pipe(catchError(this.sharedService.handleError));
  }

}
