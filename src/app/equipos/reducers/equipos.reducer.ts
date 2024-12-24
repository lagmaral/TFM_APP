import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions';
import { EquipoDTO } from 'src/app/admin/models/equipo.dto';
import { StaffDTO } from 'src/app/admin/models/staff.dto';
import { EquipoStaffDTO } from 'src/app/admin/models/equipo-staff.dto';
import { PlantillaDTO } from 'src/app/admin/models/plantilla.dto';

export interface TeamState {
  teamList: EquipoDTO[];
  loadedTeam: EquipoDTO;
  loading: boolean;
  loaded: boolean;
  error: any;
  plantilla:{
    equipo:EquipoDTO,
    staff:EquipoStaffDTO[],
    jugadores:PlantillaDTO[]

  },

}

export const initialState: TeamState = {

  teamList: [],
  plantilla: {
    equipo: new EquipoDTO(0,0,'','',0,false,''),
    staff: [],
    jugadores: []

  },
  loadedTeam: new EquipoDTO(0,0,'','',-1,false,''),
  loading: false,
  loaded: false,
  error: null,

};

const _teamReducer = createReducer(
  initialState,
  // Search with filters
  on(actions.searchActiveTeams, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(actions.searchActiveTeamsSuccess, (state, { results }) => ({
    ...state,
    loading: false,
    loaded: true,
    teamList: results, // Assuming results is of type StaffPaginatedResponse
  })),

  on(actions.searchActiveTeamsFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(actions.getStaffTeamsById, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(actions.getStaffTeamsByIdSuccess, (state, { payload }) => ({
    ...state,
    plantilla: {
      equipo: payload.equipo,
      staff: payload.staff,
      jugadores: payload.jugadores
    },
    loading: false,
    error: null
  })),

  on(actions.getStaffTeamsByIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  }))
);

export function teamReducer(state: TeamState | undefined, action: Action): TeamState {
  return _teamReducer(state, action);
}
