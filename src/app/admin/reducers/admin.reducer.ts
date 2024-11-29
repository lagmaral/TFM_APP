
import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions';
import { StaffDTO } from '../models/staff.dto';

export interface AdminState {

  staffList: StaffDTO[];
  loadedStaff : StaffDTO;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: AdminState = {
  staffList: [],
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
    staffList: results, // Update staffList with results from the action
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
    staffList: [...state.staffList, item], // Add the new staff to the list
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
    const updatedList = state.staffList.map((staff: StaffDTO) =>
      staff.id === item.id ? item : staff // Update the specific staff item
    );

    return {
      ...state,
      loading: false,
      loaded: true,
      staffList: updatedList, // Update the staff list with the modified staff
      loadedStaff: new StaffDTO(0,'','','',true,new Date(),'','',''),
    };
  }),
  on(actions.modifyStaffFailure, (state, { payload }) => ({
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
    loadedStaff: item, // Assuming item is a single StaffDTO
  })),
  on(actions.getStaffByIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  }))
);

export function adminReducer(state: AdminState | undefined, action: Action): AdminState {
  return _adminReducer(state, action);
}


