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

export const getMatchById = createAction(
  '[Search Match By ID] Search Match By ID',
  props<{ id: number }>()
);

export const getMatchByIdSuccess = createAction(
  '[Search Match By ID] Search Match By ID IDSuccess',
  props<{  item: PartidoDTO }>()
);

export const getMatchByIdFailure = createAction(
  '[Search Match By ID] Search Match By ID Failure',
  props<{  payload : HttpErrorResponse }>()
);

export const modifyMatch= createAction(
  '[modifyMatch] modifyMatchMatch',
  props<{ item: PartidoDTO}>()
);

export const modifyMatchSuccess = createAction(
  '[modifyMatch] modifyMatchMatch Success',
  props<{ id: number, item: PartidoDTO}>()
);

export const modifyMatchFailure = createAction(
  '[modifyMatch] modifyMatchFailure',
  props<{ payload: HttpErrorResponse }>()
);

export const modifyMatchGoal= createAction(
  '[modifyMatchGoal] modifyMatchGoal',
  props<{ item: PartidoDTO}>()
);

export const modifyMatchGoalSuccess = createAction(
  '[modifyMatchGoal] modifyMatchGoal Success',
  props<{ id: number, item: PartidoDTO}>()
);

export const modifyMatchGoalFailure = createAction(
  '[modifyMatchGoal] modifyMatchGoal Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getLast7DaysMatches = createAction(
  '[getLast7DaysMatches] getLast7DaysMatches'
);

export const getLast7DaysMatchesSuccess = createAction(
  '[getLast7DaysMatches] getLast7DaysMatches Success',
  props<{  payload: PartidoDTO[] }>()
);

export const getLast7DaysMatchesFailure = createAction(
  '[getLast7DaysMatches] getLast7DaysMatches Failure',
  props<{  payload : HttpErrorResponse }>()
);

export const getMatchDetailBack = createAction(
  '[getMatchDetailBack] getMatchDetailBack'
);
