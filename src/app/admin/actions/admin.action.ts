import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { StaffDTO } from '../models/staff.dto';

// Search with filters
export const searchStaffWithFilters = createAction(
  '[Search Staff] Search With Filters',
  props<{ filters: any }>()
);

export const searchStaffWithFiltersSuccess = createAction(
  '[Search Staff] Search With Filters Success',
  props<{ results: StaffDTO[] }>()
);

export const searchStaffWithFiltersFailure = createAction(
  '[Search Staff] Search With Filters Failure',
  props<{ error: HttpErrorResponse }>()
);

// Save new Staff
export const saveNewStaff = createAction(
  '[New Staff] Save New Staff',
  props<{ staff: Partial<StaffDTO> }>()
);

export const saveNewStaffSuccess = createAction(
  '[New Staff] Save New Staff Success',
  props<{ staff: StaffDTO }>()
);

export const saveNewStaffFailure = createAction(
  '[New Staff] Save New Staff Failure',
  props<{ error: HttpErrorResponse }>()
);

// Modify existing Staff
export const modifyStaff = createAction(
  '[Update Staff] Modify Staff',
  props<{ id: string, changes: Partial<StaffDTO> }>()
);

export const modifyStaffSuccess = createAction(
  '[Update Staff] Modify Staff Success',
  props<{ updatedStaff: StaffDTO }>()
);

export const modifyStaffFailure = createAction(
  '[Update Staff] Modify Staff Failure',
  props<{ error: HttpErrorResponse }>()
);

// Search Staff by ID
export const searchStaffById = createAction(
  '[Search Staff By ID] Search Staff By ID',
  props<{ id: string }>()
);

export const searchStaffByIdSuccess = createAction(
  '[Search Staff By ID] Search Staff By ID Success',
  props<{ item: StaffDTO }>()
);

export const searchStaffByIdFailure = createAction(
  '[Search Staff By ID] Search Staff By ID Failure',
  props<{ error: HttpErrorResponse }>()
);
