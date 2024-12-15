import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers';


export const selectLanguageState =
  createFeatureSelector<AuthState>('currentLanguage');

  export const selectLoggedState =
  createFeatureSelector<AuthState>('credentials');

export const selectCurrentLanguage = createSelector(
  selectLanguageState,
  (state: AuthState) => state?.currentLanguage ?? 'es'
);

/*export const selectLoggedUser = createSelector(
  selectLoggedState,
  (state: AuthState) => state.credentials
);


*/

