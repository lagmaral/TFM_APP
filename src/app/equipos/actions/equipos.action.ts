import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { EquipoDTO } from 'src/app/admin/models/equipo.dto';
import { EquipoStaffDTO } from 'src/app/admin/models/equipo-staff.dto';
import { PlantillaDTO } from 'src/app/admin/models/plantilla.dto';

interface StaffTeamsPayload {
  equipo: EquipoDTO;
  staff: EquipoStaffDTO[];
  jugadores: PlantillaDTO[];
}


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


export const getStaffTeamsById = createAction(
  '[Search Plantilla Teams By ID] Search Plantilla Teams By ID',
  props<{ id: number }>()
);

export const getStaffTeamsByIdSuccess = createAction(
  '[Search Plantilla Teams By ID] Search Plantilla Teams By ID Success',
  props<{  payload: StaffTeamsPayload }>()
);

export const getStaffTeamsByIdFailure = createAction(
  '[Search Staff Plantilla By ID] Search Plantilla Teams By ID Failure',
  props<{  payload : HttpErrorResponse }>()
);

