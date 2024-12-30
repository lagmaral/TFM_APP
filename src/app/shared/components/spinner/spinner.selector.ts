import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';



export const selectGlobalLoading = createSelector(
  (state: AppState) => state.auth,
  (state: AppState) => state.admin,
  (state: AppState) => state.partido,
  (state: AppState) => state.team,
  (auth, admin, partido, team): boolean => {
    return (
      auth.loading ||
      admin.loading ||
      partido.loading ||
      team.loading
    );
  }
);
