import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { EquipoDTO } from 'src/app/admin/models/equipo.dto';




// Search with filters
export const searchActiveTeams = createAction(
  '[Search Teams] Search ActiveTeams'
);

export const searchActiveTeamsSuccess = createAction(
  '[Search Teams] Search ActiveTeams Success',
  props<{ results: EquipoDTO[]}>()
);

export const searchActiveTeamsFailure = createAction(
  '[Search Teams] Search ActiveTeams Failure',
  props<{ payload: HttpErrorResponse }>()
);




