import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { PartidoDTO } from '../models/partido.dto';

export const saveNewMatch= createAction(
  '[saveNewMatch] saveNewMatch',
  props<{ item: PartidoDTO}>()
);

export const saveNewMatchSuccess = createAction(
  '[saveNewMatch] saveNewMatch Success',
  props<{ item: PartidoDTO}>()
);

export const saveNewMatchFailure = createAction(
  '[saveNewMatch] saveNewMatchFailure',
  props<{ payload: HttpErrorResponse }>()
);


export const getMatches4TeamsById = createAction(
  '[Search Matches For Teams By ID] Search Matches For Teams By ID',
  props<{ id: number }>()
);

export const getMatches4TeamsByIdSuccess = createAction(
  '[Search Matches For Teams By ID] Search Matches For Teams By IDSuccess',
  props<{  payload: PartidoDTO[] }>()
);

export const getMatches4TeamsByIdFailure = createAction(
  '[Search Matches For Teams By ID] Search Matches For Teams By ID Failure',
  props<{  payload : HttpErrorResponse }>()
);

