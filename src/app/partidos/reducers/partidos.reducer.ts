import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions';
import { EquipoDTO } from 'src/app/admin/models/equipo.dto';
import { StaffDTO } from 'src/app/admin/models/staff.dto';
import { EquipoStaffDTO } from 'src/app/admin/models/equipo-staff.dto';
import { PlantillaDTO } from 'src/app/admin/models/plantilla.dto';
import { PartidoDTO } from '../models/partido.dto';

export interface PartidoState {
  partidosList: PartidoDTO[];
  loadedPartido: PartidoDTO;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: PartidoState = {

  partidosList: [],
  loadedPartido: new PartidoDTO(),
  loading: false,
  loaded: false,
  error: null,

};

const _partidoReducer = createReducer(
  initialState,

  on(actions.getMatches4TeamsById, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(actions.getMatches4TeamsByIdSuccess, (state, { payload }) => ({
    ...state,
    partidosList: payload,
    loading: false,
    error: null
  })),

  on(actions.getMatches4TeamsByIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(actions.saveNewMatch, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(actions.saveNewMatchSuccess, (state, { item }) => ({
    ...state,
    partidosList: [...state.partidosList, item], // Agrega el nuevo partido a la lista existente
    loading: false,
    error: null
  })),

  on(actions.saveNewMatchFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  }))
);

export function partidoReducer(state: PartidoState | undefined, action: Action): PartidoState {
  return _partidoReducer(state, action);
}
