import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions';
import { StaffDTO } from '../models/staff.dto';
import { EquipoDTO } from '../models/equipo.dto';
import { PosicionDTO } from '../models/posicion.dto';
import { JugadorDTO } from '../models/jugador.dto';

export interface StaffPaginatedResponse {
  data: StaffDTO[];
  total: number;
}

export interface PlayerPaginatedResponse {
  data: JugadorDTO[];
  total: number;
}

export interface TeamPaginatedResponse {
  data: EquipoDTO[];
  total: number;
}
export interface PaginatedFilter {
  pageNumber: number;
  recordsXPage: number;
  filters: any;
}

export interface AdminState {
  staffList: StaffPaginatedResponse;
  teamList: TeamPaginatedResponse;
  playerList: PlayerPaginatedResponse;
  catalogTeams: EquipoDTO[];
  catalogPosiciones: PosicionDTO[];
  loadedStaff: StaffDTO;
  loadedTeam: EquipoDTO;
  loadedPlayer: JugadorDTO;
  loading: boolean;
  loaded: boolean;
  error: any;
  filters: PaginatedFilter;
}

export const initialState: AdminState = {
  staffList: {
    data: [],
    total: 0
  },
  teamList: {
    data: [],
    total: 0
  },
  playerList: {
    data: [],
    total: 0
  },
  catalogPosiciones: [] = [
    new PosicionDTO(0, '') // Primer elemento como instancia de PosicionDTO
  ],
  catalogTeams: [] = [
    new EquipoDTO(0,0,'','',-1,false,''),
  ],
  loadedStaff: new StaffDTO(0,'','','',true,new Date(),'','',''),
  loadedTeam: new EquipoDTO(0,0,'','',-1,false,''),
  loadedPlayer: new JugadorDTO(0,0,0,'',new Date(),'',false,'','','','',[]),
  loading: false,
  loaded: false,
  error: null,
  filters: {
    pageNumber:0,
    recordsXPage:50,
    filters:{}
  }
};

const _adminReducer = createReducer(
  initialState,
  on(actions.setFilters, (state, { paginated }) => ({
    ...state,
    staffList: {
      data: [],
      total: 0
    },
    teamList: {
      data: [],
      total: 0
    },
    filters:paginated, // Actualiza el estado con los nuevos filtros
  })),
  on(actions.clearFilters, () => initialState),
  on(actions.cleanDetail, state => ({
    ...state,
    loadedStaff: new StaffDTO(0,'','','',true,new Date(),'','',''),
    loadedTeam: new EquipoDTO(0,0,'','',-1,false,''),
    loadedPlayer: new JugadorDTO(0,0,0,'',new Date(),'',false,'','','','',[]),
  })),
  // Search with filters
  on(actions.searchStaffWithFilters, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(actions.searchStaffWithFiltersSuccess, (state, { results }) => ({
    ...state,
    loading: false,
    loaded: true,
    staffList: results, // Assuming results is of type StaffPaginatedResponse
  })),

  on(actions.searchStaffWithFiltersFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  // Save new Staff
  on(actions.saveNewStaff, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(actions.saveNewStaffSuccess, (state, { item }) => ({
    ...state,
    loading: false,
    loaded: true,
    staffList: {
      ...state.staffList,
      data: [...state.staffList.data, item],
      total: state.staffList.total + 1
    },
    loadedStaff: new StaffDTO(0,'','','',true,new Date(),'','',''),
  })),
  on(actions.saveNewStaffFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  // Modify existing Staff
  on(actions.modifyStaff, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(actions.modifyStaffSuccess, (state, { item }) => {
    // Actualiza el staffList.data con el nuevo item donde coincida el id
    const updatedData = state.staffList.data.map((staff: StaffDTO) =>
      staff.id === item.id ? { ...staff, ...item } : staff // Actualiza solo el staff que coincide
    );

    return {
      ...state,
      loading: false,
      loaded: true,
      staffList: {
        ...state.staffList,
        data: updatedData // Reemplaza la lista de datos con la lista actualizada
      },
      loadedStaff: new StaffDTO(0, '', '', '', true, new Date(), '', '', ''), // Reinicia loadedStaff
    };
  }),
  on(actions.modifyStaffFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  // Delete existing Staff
  on(actions.deleteStaff, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(actions.deleteStaffSuccess, (state, { id }) => {
    // Filtrar el staffList para eliminar el staff cuyo id coincide
    const updatedData = state.staffList.data.filter((staff: StaffDTO) => staff.id !== id);

    return {
      ...state,
      loading: false,
      loaded: true,
      staffList: {
        ...state.staffList,
        data: updatedData // Actualiza la lista con los datos filtrados
      },
      loadedStaff: new StaffDTO(0, '', '', '', true, new Date(), '', '', ''),
    };
  }),
  on(actions.deleteStaffFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  // Search Staff by ID
  on(actions.getStaffById, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(actions.getStaffByIdSuccess, (state, { item }) => ({
    ...state,
    loading: false,
    loaded: true,
    loadedStaff: item,
  })),
  on(actions.getStaffByIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  // Search Teams with filters
  on(actions.searchTeamsWithFilters, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(actions.searchTeamsWithFiltersSuccess, (state, { results }) => ({
    ...state,
    loading: false,
    loaded: true,
    teamList: results, // Assuming results is of type StaffPaginatedResponse
  })),

  on(actions.searchTeamsWithFiltersFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

    // Search Team by ID
    on(actions.getTeamById, state => ({
      ...state,
      loading: true,
      loaded: false,
      error: null,
    })),
    on(actions.getTeamByIdSuccess, (state, { item }) => ({
      ...state,
      loading: false,
      loaded: true,
      loadedTeam: item,
    })),
    on(actions.getTeamByIdFailure, (state, { payload }) => ({
      ...state,
      loading: false,
      loaded: false,
      error: { payload },
    })),

  // Save new Team
  on(actions.saveNewTeam, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(actions.saveNewTeamSuccess, (state, { item }) => ({
    ...state,
    loading: false,
    loaded: true,
    teamList: {
      ...state.teamList,
      data: [...state.teamList.data, item],
      total: state.teamList.total + 1
    },
    loadedTeam: new EquipoDTO(0,0,'','',-1,false,''),
  })),
  on(actions.saveNewTeamFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  // Modify existing Team
  on(actions.modifyTeam, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(actions.modifyTeamSuccess, (state, { item }) => {
    // Actualiza el staffList.data con el nuevo item donde coincida el id
    const updatedData = state.teamList.data.map((team: EquipoDTO) =>
      team.id === item.id ? { ...team, ...item } : team // Actualiza solo el staff que coincide
    );

    return {
      ...state,
      loading: false,
      loaded: true,
      teamList: {
        ...state.teamList,
        data: updatedData // Reemplaza la lista de datos con la lista actualizada
      },
      loadedTeam: new EquipoDTO(0,0,'','',0,false,''), // Reinicia loadedTeam
    };
  }),
  on(actions.modifyTeamFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  // Delete existing Team
  on(actions.deleteTeam, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(actions.deleteTeamSuccess, (state, { id }) => {
    // Filtrar el staffList para eliminar el staff cuyo id coincide
    const updatedData = state.teamList.data.filter((team: EquipoDTO) => team.id !== id);

    return {
      ...state,
      loading: false,
      loaded: true,
      teamList: {
        ...state.teamList,
        data: updatedData // Actualiza la lista con los datos filtrados
      },
      loadedTeam: new EquipoDTO(0,0,'','',0,false,''), // Reinicia loadedTeam
    };
  }),
  on(actions.deleteTeamFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  // Modify Team order
  on(actions.changeOrderTeam, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(actions.changeOrderSuccess, (state) =>({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(actions.changeOrderFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  //OPERACIONES SOBRE PLAYERS

// Search Teams with filters
  on(actions.searchPlayersWithFilters, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(actions.searchPlayersWithFiltersSuccess, (state, { results }) => ({
    ...state,
    loading: false,
    loaded: true,
    playerList: results, // Assuming results is of type StaffPaginatedResponse
  })),

  on(actions.searchPlayersWithFiltersFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

    // Search Team by ID
    on(actions.getPlayerById, state => ({
      ...state,
      loading: true,
      loaded: false,
      error: null,
    })),
    on(actions.getPlayerByIdSuccess, (state, { item }) => ({
      ...state,
      loading: false,
      loaded: true,
      loadedPlayer: item,
    })),
    on(actions.getPlayerByIdFailure, (state, { payload }) => ({
      ...state,
      loading: false,
      loaded: false,
      error: { payload },
    })),

  // Save new Team
  on(actions.saveNewPlayer, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(actions.saveNewPlayerSuccess, (state, { item }) => ({
    ...state,
    loading: false,
    loaded: true,
    playerList: {
      ...state.playerList,
      data: [...state.playerList.data, item],
      total: state.playerList.total + 1
    },
    loadedPlayer: new JugadorDTO(0,0,0,'',new Date(),'',false,'','','','',[]),
  })),
  on(actions.saveNewPlayerFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  // Modify existing Player
  on(actions.modifyPlayer, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(actions.modifyPlayerSuccess, (state, { item }) => {
    // Actualiza el staffList.data con el nuevo item donde coincida el id
    const updatedData = state.playerList.data.map((player: JugadorDTO) =>
      player.id === item.id ? { ...player, ...item } : player // Actualiza solo el staff que coincide
    );

    return {
      ...state,
      loading: false,
      loaded: true,
      playerList: {
        ...state.playerList,
        data: updatedData // Reemplaza la lista de datos con la lista actualizada
      },
      loadedPlayer: new JugadorDTO(0,0,0,'',new Date(),'',false,'','','','',[]),
    };
  }),
  on(actions.modifyPlayerFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  // Delete existing Team
  on(actions.deletePlayer, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(actions.deletePlayerSuccess, (state, { id }) => {
    // Filtrar el staffList para eliminar el staff cuyo id coincide
    const updatedData = state.playerList.data.filter((player: JugadorDTO) => player.id !== id);

    return {
      ...state,
      loading: false,
      loaded: true,
      playerList: {
        ...state.playerList,
        data: updatedData // Actualiza la lista con los datos filtrados
      },
      loadedPlayer: new JugadorDTO(0,0,0,'',new Date(),'',false,'','','','',[]),
    };
  }),
  on(actions.deletePlayerFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  //CATALOGS
  on(actions.searchTeamCatalog, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(actions.searchTeamCatalogSuccess, (state, { results }) => ({
    ...state,
    loading: false, // Cambiar a false si la carga ha terminado
    loaded: true,
    error: null,
    catalogTeams: [
      state.catalogTeams[0], // Mantener el primer elemento
      ...results // Agregar los nuevos resultados a partir del segundo elemento
    ],
  })),
  on(actions.searchTeamCatalogFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(actions.searchPosicionesCatalog, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(actions.searchPosicionesCatalogSuccess, (state, { results }) => ({
    ...state,
    loading: false, // Cambiar a false si la carga ha terminado
    loaded: true,
    error: null,
    catalogPosiciones: [
      state.catalogPosiciones[0], // Mantener el primer elemento
      ...results // Agregar los nuevos resultados a partir del segundo elemento
    ],
  })),
  on(actions.searchPosicionesCatalogFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(actions.getPlayerTeamsById, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(actions.getPlayerTeamsByIdSuccess, (state, { item }) => ({
    ...state,
    loading: false,
    loaded: true,
    loadedPlayer: item,
  })),
  on(actions.getPlayerTeamsByIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(actions.saveNewPlayerTeam, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(actions.saveNewPlayerTeamSuccess, (state, { item }) => ({
    ...state,
    loading: false,
    loaded: true,
    playerList: {
      ...state.playerList,
      data: [...state.playerList.data, item],
      total: state.playerList.total + 1
    },
    loadedPlayer: new JugadorDTO(0,0,0,'',new Date(),'',false,'','','','',[]),
  })),
  on(actions.saveNewPlayerTeamFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(actions.deletePlayerTeam, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(actions.deletePlayerTeamSuccess, (state, { id }) => {
    // Filtrar el staffList para eliminar el staff cuyo id coincide
    const updatedData = state.playerList.data.filter((player: JugadorDTO) => player.id !== id);

    return {
      ...state,
      loading: false,
      loaded: true,
      playerList: {
        ...state.playerList,
        data: updatedData // Actualiza la lista con los datos filtrados
      },
      loadedPlayer: new JugadorDTO(0,0,0,'',new Date(),'',false,'','','','',[]),
    };
  }),
  on(actions.deletePlayerTeamFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
);

export function adminReducer(state: AdminState | undefined, action: Action): AdminState {
  return _adminReducer(state, action);
}
