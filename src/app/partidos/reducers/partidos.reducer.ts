import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions';
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

  on(actions.getMatchDetailBack, state => ({
    ...state,
    loading: false,
    loaded: false,
    error: null,
    loadedPartido: new PartidoDTO(),
  })),
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
    error: null,
    loadedPartido: new PartidoDTO(),
  })),

  on(actions.saveNewMatchFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(actions.getMatchById, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(actions.getMatchByIdSuccess, (state, { item }) => ({
    ...state,
    loading: false,
    loaded: true,
    loadedPartido: item,
  })),
  on(actions.getMatchByIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(actions.modifyMatch, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(actions.modifyMatchSuccess, (state, { item }) => {
    // Actualiza el staffList.data con el nuevo item donde coincida el id
    const updatedData = state.partidosList.map((match: PartidoDTO) =>
      match.id === item.id ? { ...match, ...item } : match // Actualiza solo el staff que coincide
    );

    return {
      ...state,
      loading: false,
      loaded: true,
      partidosList: {
        ...state.partidosList,
        data: updatedData // Reemplaza la lista de datos con la lista actualizada
      },
      loadedPartido: new PartidoDTO(),
    };
  }),
  on(actions.modifyMatchFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(actions.modifyMatchGoal, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(actions.modifyMatchGoalSuccess, (state, { item }) => {
    // Actualiza el staffList.data con el nuevo item donde coincida el id
    const updatedData = state.partidosList.map((match: PartidoDTO) =>
      match.id === item.id ? { ...match, ...item } : match // Actualiza solo el staff que coincide
    );

    return {
      ...state,
      loading: false,
      loaded: true,
      partidosList: {
        ...state.partidosList,
        data: updatedData // Reemplaza la lista de datos con la lista actualizada
      },
      loadedPartido: new PartidoDTO(),
    };
  }),
  on(actions.modifyMatchGoalFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(actions.getLast7DaysMatches, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(actions.getLast7DaysMatchesSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    partidosList: payload,
  })),
  on(actions.getLast7DaysMatchesFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
);

export function partidoReducer(state: PartidoState | undefined, action: Action): PartidoState {
  return _partidoReducer(state, action);
}


