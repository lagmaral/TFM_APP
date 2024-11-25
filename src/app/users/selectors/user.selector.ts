import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { UserState } from '../reducers/user.reducer';


/*export const selectLanguageState =
  createFeatureSelector<UserState>('currentLanguage');

export const selectCurrentLanguage = createSelector(
  selectLanguageState,
  (state: UserState) => state?.currentLanguage ?? 'es'
);*/
