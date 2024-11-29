import { ActionReducerMap } from '@ngrx/store';
import { AdminEffects } from './admin/effects/admin.effects';
import * as AdminReducer from './admin/reducers/admin.reducer';
import { AuthEffects } from './auth/effects';
import * as AuthReducer from './auth/reducers/auth.reducer';
export interface AppState {
  admin: AdminReducer.AdminState;
  auth: AuthReducer.AuthState;

}

export const appReducers: ActionReducerMap<AppState> = {
  admin: AdminReducer.adminReducer,
  auth: AuthReducer.authReducer,

};

export const EffectsArray: any[] = [
  AdminEffects,
  AuthEffects,
];


