import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions';
import { StaffDTO } from '../models/staff.dto';

export interface StaffPaginatedResponse {
  data: StaffDTO[];
  total: number;
}

export interface AdminState {
  staffList: StaffPaginatedResponse;
  loadedStaff: StaffDTO;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: AdminState = {
  staffList: {
    data: [],
    total: 0
  },
  loadedStaff: new StaffDTO(0,'','','',true,new Date(),'','',''),
  loading: false,
  loaded: false,
  error: null,
};

const _adminReducer = createReducer(
  initialState,

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
    const updatedData = state.staffList.data.map((staff: StaffDTO) =>
      staff.id === item.id ? item : staff
    );

    return {
      ...state,
      loading: false,
      loaded: true,
      staffList: {
        ...state.staffList,
        data: updatedData
      },
      loadedStaff: new StaffDTO(0,'','','',true,new Date(),'','',''),
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

);

export function adminReducer(state: AdminState | undefined, action: Action): AdminState {
  return _adminReducer(state, action);
}
