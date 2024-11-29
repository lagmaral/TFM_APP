import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { StaffDTO } from '../models/staff.dto';
import { PaginatedFilter, StaffPaginatedResponse } from '../reducers';

export const setFilters = createAction(
  '[Admin] Set Filters',
  props<{ paginated :PaginatedFilter }>() // Ajusta el tipo según tus necesidades
);

export const clearFilters = createAction('[Admin] Clear Filters');

// Search with filters
export const searchStaffWithFilters = createAction(
  '[Search Staff] Search With Filters',
  props<{ paginated:PaginatedFilter }>()
);

export const searchStaffWithFiltersSuccess = createAction(
  '[Search Staff] Search With Filters Success',
  props<{ results: StaffPaginatedResponse}>()
);

export const searchStaffWithFiltersFailure = createAction(
  '[Search Staff] Search With Filters Failure',
  props<{ payload: HttpErrorResponse }>()
);

// Save new Staff
export const saveNewStaff = createAction(
  '[New Staff] Save New Staff',
  props<{ item: FormData }>()
);

export const saveNewStaffSuccess = createAction(
  '[New Staff] Save New Staff Success',
  props<{ item: StaffDTO }>()
);

export const saveNewStaffFailure = createAction(
  '[New Staff] Save New Staff Failure',
  props<{ payload: HttpErrorResponse }>()
);

// Modify existing Staff
export const modifyStaff = createAction(
  '[Update Staff] Modify Staff',
  props<{ id: number, item: FormData, paginated:PaginatedFilter }>()
);

export const modifyStaffSuccess = createAction(
  '[Update Staff] Modify Staff Success',
  props<{ id: number, item: StaffDTO, paginated:PaginatedFilter }>()
);

export const modifyStaffFailure = createAction(
  '[Update Staff] Modify Staff Failure',
  props<{  payload : HttpErrorResponse }>()
);

// Search Staff by ID
export const getStaffById = createAction(
  '[Search Staff By ID] Search Staff By ID',
  props<{ id: number }>()
);

export const getStaffByIdSuccess = createAction(
  '[Search Staff By ID] Search Staff By ID Success',
  props<{ item: StaffDTO }>()
);

export const getStaffByIdFailure = createAction(
  '[Search Staff By ID] Search Staff By ID Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const deleteStaff = createAction(
  '[Delete Staff] Delete Staff',
  props<{ id: number }>()
);

export const deleteStaffSuccess = createAction(
  '[Delete Staff] Delete Staff Success',
  props<{ id: number }>()
);

export const deleteStaffFailure = createAction(
  '[Delete Staff] Delete Staff Failure',
  props<{  payload : HttpErrorResponse }>()
);
