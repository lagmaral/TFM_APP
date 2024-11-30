import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions';
import { StaffDTO } from '../models/staff.dto';
import { EquipoDTO } from '../models/equipo.dto';

export interface StaffPaginatedResponse {
  data: StaffDTO[];
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
  loadedStaff: StaffDTO;
  loadedTeam: EquipoDTO;
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
  loadedStaff: new StaffDTO(0,'','','',true,new Date(),'','',''),
  loadedTeam: new EquipoDTO(0,0,'','',-1,false,''),
  loading: false,
  loaded: false,
  error: null,
  filters: {
    pageNumber:1,
    recordsXPage:50,
    filters:{}
  }
};

const _adminReducer = createReducer(
  initialState,
  on(actions.setFilters, (state, { paginated }) => ({
    ...state,
    filters:paginated, // Actualiza el estado con los nuevos filtros
  })),
  on(actions.clearFilters, (state) => ({
    ...state,
    filters: {
      pageNumber:1,
      recordsXPage:50,
      filters:{}
    }, // Limpia los filtros
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

);

export function adminReducer(state: AdminState | undefined, action: Action): AdminState {
  return _adminReducer(state, action);
}
