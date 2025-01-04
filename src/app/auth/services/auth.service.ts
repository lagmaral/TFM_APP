import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthDTO } from '../models/auth.dto';
import { SharedService } from 'src/app/shared/services/shared.service';
import { UsuarioDTO } from '../models/usuario.dto';
import { environment } from '../../../environments/environment';
export interface AuthToken {
  user_id: string;
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'usuarios';
    this.urlApi = environment.apiUrl+'/pauldarrak/' + this.controller;
  }

  login(auth: AuthDTO): Observable<UsuarioDTO> {
    return this.http
      .post<UsuarioDTO>(this.urlApi+"/doLogin", auth)
      .pipe(catchError(this.sharedService.handleError));
  }

  logout(token: string): Observable<UsuarioDTO> {
    return this.http
      .post<UsuarioDTO>(`${this.urlApi}/doLogout/${token}`, {})
      .pipe(catchError(this.sharedService.handleError));
  }

  newUser(usuario: UsuarioDTO): Observable<UsuarioDTO> {
    console.log('Nuevo usuario: '+JSON.stringify(usuario));
    return this.http
    .post<UsuarioDTO>(this.urlApi, usuario)
      .pipe(catchError(this.sharedService.handleError));
  }

  modifyUser(usuario: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http
    .put<UsuarioDTO>(`${this.urlApi}/${usuario.token}`, usuario)
      .pipe(catchError(this.sharedService.handleError));
  }

  getUserbyToken(token: string): Observable<UsuarioDTO> {
    return this.http
    .get<UsuarioDTO>(`${this.urlApi}/${token}`, {})
      .pipe(catchError(this.sharedService.handleError));
  }

}
