import { ActionReducerMap } from '@ngrx/store';
import { AdminEffects } from './admin/effects/admin.effects';
import * as AdminReducer from './admin/reducers/admin.reducer';
import { AuthEffects } from './auth/effects';
import * as AuthReducer from './auth/reducers/auth.reducer';
import { TeamEffects } from './equipos/effects';
import * as TeamReducer from './equipos/reducers/equipos.reducer';
import { PartidoEffects } from './partidos/effects/partidos.effects';
import * as PartidosReducer from './partidos/reducers/partidos.reducer';
export interface AppState {
  admin: AdminReducer.AdminState;
  auth: AuthReducer.AuthState;
  team: TeamReducer.TeamState;
  partido: PartidosReducer.PartidoState
}

export const appReducers: ActionReducerMap<AppState> = {
  admin: AdminReducer.adminReducer,
  auth: AuthReducer.authReducer,
  team: TeamReducer.teamReducer,
  partido:PartidosReducer.partidoReducer
};

export const EffectsArray: any[] = [
  AdminEffects,
  AuthEffects,
  TeamEffects,
  PartidoEffects,
];


