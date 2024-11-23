import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { AuthState } from '../reducers';


export const selectAuthState = (state: AppState) => state.auth;

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: AuthState): boolean => state.loading
);
