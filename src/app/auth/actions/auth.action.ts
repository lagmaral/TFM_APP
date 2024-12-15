import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { AuthDTO } from '../models/auth.dto';
import { UsuarioDTO } from '../models/usuario.dto';

export const changeAppLanguage = createAction(
  'Cambiar el locale de la aplicacion',
  props<{ locale: string }>()
);

export const login = createAction(
  '[Acceso] Login',
  props<{ credentials: AuthDTO }>()
);

export const loginSuccess = createAction(
  '[Acceso] Login Exitoso',
  props<{ credentials: UsuarioDTO }>()
);

export const loginFailure = createAction(
  '[Acceso] Login Erroneo',
  props<{ payload: HttpErrorResponse }>()
);

export const logout = createAction(
  '[Acceso] Logout',
  props<{ token: string }>() // Si no necesitas pasar un token en logout, puedes eliminar esto
);

export const logoutSuccess = createAction(
  '[Acceso] Logout Exitoso'
);

export const logoutFailure = createAction(
  '[Acceso] Logout Erroneo',
  props<{ payload: HttpErrorResponse }>()
);

export const register = createAction(
  '[Registro] Nuevo usuario',
  props<{ user: UsuarioDTO }>()
);
export const registerSuccess = createAction(
  '[Registro] Nuevo usuario exitoso',
  props<{ user: UsuarioDTO }>()
);

export const registerFailure = createAction(
  '[Registro] Nuevo usuario erroneo',
  props<{ payload: HttpErrorResponse }>()
);

export const updateUser = createAction(
  '[Registro] Modificar usuario',
  props<{ userId: string; user: UsuarioDTO }>()
);
export const updateUserSuccess = createAction(
  '[Registro] Modificar usuario exitosos',
  props<{ userId: string; user: UsuarioDTO }>()
);

export const updateUserFailure = createAction(
  '[Registro] Modificar usuario erroneo',
  props<{ payload: HttpErrorResponse }>()
);

export const getUserByToken = createAction(
  '[Registro] Obtener usuario por token',
  props<{ userId: string }>()
);
export const getUserByTokenSuccess = createAction(
  '[Registro] Obtener usuario por token exitoso',
  props<{ credentials: UsuarioDTO }>()
);

export const getUserByTokenFailure = createAction(
  '[Registro] Obtener usuario por token erroneo',
  props<{ payload: HttpErrorResponse }>()
);
