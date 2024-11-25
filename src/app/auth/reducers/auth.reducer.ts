import { Action, createReducer, on } from '@ngrx/store';
import { changeAppLanguage, getUserByToken, getUserByTokenFailure, getUserByTokenSuccess, login, loginFailure, loginSuccess, logout, logoutFailure, logoutSuccess, register, registerFailure, registerSuccess, updateUser, /* ...otras acciones */
updateUserFailure,
updateUserSuccess} from '../actions';
import { UsuarioDTO } from '../models/usuario.dto';

export interface AuthState {
  currentLanguage: string;
  credentials: UsuarioDTO;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: AuthState = {
  credentials: new UsuarioDTO(),
  loading: false,
  loaded: false,
  error: null,
  currentLanguage: "es"
};

const _authReducer = createReducer(
  initialState,
  on(changeAppLanguage, (state, { locale }) => ({
    ...state,
    currentLanguage: locale,
  })),
  on(getUserByToken, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getUserByTokenSuccess, (state, { credentials }) => ({
    ...state,
    credentials,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getUserByTokenFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(login, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(loginSuccess, (state, { credentials }) => ({
    ...state,
    credentials,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(loginFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(logout, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(logoutSuccess, () => initialState),
  on(logoutFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(register, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(registerSuccess, (state) => ({
    ...state,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(registerFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(updateUser, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(updateUserSuccess, (state, { user }) => ({
    ...state,
    credentials: user,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(updateUserFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  // ... otros manejadores de acciones
);

export function authReducer(state: AuthState | undefined, action: Action): AuthState {
  return _authReducer(state, action);
}
