import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { EquipoDTO } from 'src/app/admin/models/equipo.dto';
import { EquipoStaffDTO } from 'src/app/admin/models/equipo-staff.dto';
import { PlantillaDTO } from 'src/app/admin/models/plantilla.dto';
import { PartidoDTO } from '../models/partido.dto';

/*interface StaffTeamsPayload {
  equipo: EquipoDTO;
  staff: EquipoStaffDTO[];
  jugadores: PlantillaDTO[];
}*/


// Search with filters
/*export const searchActiveTeams = createAction(
  '[Search Teams] Search ActiveTeams'
);

export const searchActiveTeamsSuccess = createAction(
  '[Search Teams] Search ActiveTeams Success',
  props<{ results: EquipoDTO[]}>()
);

export const searchActiveTeamsFailure = createAction(
  '[Search Teams] Search ActiveTeams Failure',
  props<{ payload: HttpErrorResponse }>()
);*/


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

