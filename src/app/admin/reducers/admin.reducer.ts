
import { ActionCreator, Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions';
import { StaffDTO } from '../models/staff.dto';

export interface AdminState {

  staffList: StaffDTO[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: AdminState = {
  staffList: [],
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

  on(actions.searchStaffWithFiltersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error, // Capture any error that occurred during the search
  })),

  // Save new Staff
  on(actions.saveNewStaff, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(actions.saveNewStaffSuccess, (state, { staff }) => ({
    ...state,
    loading: false,
    loaded: true,
    staffList: [...state.staffList, staff], // Add the new staff to the list
  })),
  on(actions.saveNewStaffFailure, (state: any, { error }: any) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),

  // Modify existing Staff
  on(actions.modifyStaff, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(actions.modifyStaffSuccess, (state, { updatedStaff }) => {
    const updatedList = state.staffList.map((staff: StaffDTO) =>
      staff.id === updatedStaff.id ? updatedStaff : staff // Update the specific staff item
    );

    return {
      ...state,
      loading: false,
      loaded: true,
      staffList: updatedList, // Update the staff list with the modified staff
    };
  }),
  on(actions.modifyStaffFailure, (state: any, { error }: any) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),

  // Search Staff by ID
  on(actions.searchStaffById, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(actions.searchStaffByIdSuccess, (state: any, { item }: any) => ({
    ...state,
    loading: false,
    loaded: true,
    credentials: item, // Assuming item is a single StaffDTO
  })),
  on(actions.searchStaffByIdFailure, (state: any, { error }: any) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  }))
);

export function adminReducer(state: AdminState | undefined, action: Action): AdminState {
  return _adminReducer(state, action);
}


