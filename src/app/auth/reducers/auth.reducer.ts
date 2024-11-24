import { Action, createReducer, on } from '@ngrx/store';
import { getUserByToken, getUserByTokenFailure, getUserByTokenSuccess, login, loginFailure, loginSuccess, logout, register, registerFailure, registerSuccess, updateUser, updateUserFailure, updateUserSuccess } from '../actions';
import { UsuarioDTO } from '../models/usuario.dto';
//import { AuthDTO } from '../models/auth.dto';

export interface AuthState {
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
};

const _authReducer = createReducer(
  initialState,
  on(login, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(loginSuccess, (state, action) => ({
    ...state,
    credentials: action.credentials,
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
  on(logout, () => initialState),
  on(register, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(registerSuccess, (state, action) => ({
    ...state,
    credentials: action.user,
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
  on(updateUserSuccess, (state, action) => ({
    ...state,
    credentials: action.user,
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
  on(getUserByToken, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getUserByTokenSuccess, (state, action) => ({
    ...state,
    credentials: action.user,
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
);


export function authReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return _authReducer(state, action);
}
