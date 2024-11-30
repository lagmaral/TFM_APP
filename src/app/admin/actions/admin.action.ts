import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { StaffDTO } from '../models/staff.dto';
import { PaginatedFilter, StaffPaginatedResponse, TeamPaginatedResponse } from '../reducers';
import { EquipoDTO } from '../models/equipo.dto';

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
  props<{ item: FormData, paginated:PaginatedFilter }>()
);

export const saveNewStaffSuccess = createAction(
  '[New Staff] Save New Staff Success',
  props<{ item: StaffDTO, paginated:PaginatedFilter }>()
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
  props<{ id: number, paginated:PaginatedFilter }>()
);

export const deleteStaffSuccess = createAction(
  '[Delete Staff] Delete Staff Success',
  props<{ id: number, paginated:PaginatedFilter }>()
);

export const deleteStaffFailure = createAction(
  '[Delete Staff] Delete Staff Failure',
  props<{  payload : HttpErrorResponse }>()
);

// Search with filters
export const searchTeamsWithFilters = createAction(
  '[Search Temas] Search With Filters',
  props<{ paginated:PaginatedFilter }>()
);

export const searchTeamsWithFiltersSuccess = createAction(
  '[Search Temas] Search With Filters Success',
  props<{ results: TeamPaginatedResponse}>()
);

export const searchTeamsWithFiltersFailure = createAction(
  '[Search Tems] Search With Filters Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getTeamById = createAction(
  '[Search Team By ID] Search Team By ID',
  props<{ id: number }>()
);

export const getTeamByIdSuccess = createAction(
  '[Search Team By ID] Search Team By ID Success',
  props<{ item: EquipoDTO }>()
);

export const getTeamByIdFailure = createAction(
  '[Search Team By ID] Search Team By ID Failure',
  props<{ payload: HttpErrorResponse }>()
);

// Save new Team
export const saveNewTeam= createAction(
  '[New Team] Save New Team',
  props<{ item: FormData, paginated:PaginatedFilter }>()
);

export const saveNewTeamSuccess = createAction(
  '[New Team] Save New Team Success',
  props<{ item: EquipoDTO, paginated:PaginatedFilter }>()
);

export const saveNewTeamFailure = createAction(
  '[New Team] Save New Team Failure',
  props<{ payload: HttpErrorResponse }>()
);

// Modify existing Team
export const modifyTeam = createAction(
  '[Update Team] Modify Team',
  props<{ id: number, item: FormData, paginated:PaginatedFilter }>()
);

export const modifyTeamSuccess = createAction(
  '[Update Team] Modify Team Success',
  props<{ id: number, item: EquipoDTO, paginated:PaginatedFilter }>()
);

export const modifyTeamFailure = createAction(
  '[Update Team] Modify Team Failure',
  props<{  payload : HttpErrorResponse }>()
);
 //Delete exisiting Team
export const deleteTeam = createAction(
  '[Delete Team] Delete Team',
  props<{ id: number, paginated:PaginatedFilter }>()
);

export const deleteTeamSuccess = createAction(
  '[Delete Team] Delete Team Success',
  props<{ id: number, paginated:PaginatedFilter }>()
);

export const deleteTeamFailure = createAction(
  '[Delete Team] Delete Team Failure',
  props<{  payload : HttpErrorResponse }>()
);

// Modify Team order
export const changeOrderTeam = createAction(
  '[Update Team] Modify Team Order',
  props<{ id: number, direccion: string, paginated:PaginatedFilter }>()
);

export const changeOrderSuccess = createAction(
  '[Update Team] Modify Team Order Success',
  props<{ id: number, item: any, paginated:PaginatedFilter }>()
);

export const changeOrderFailure = createAction(
  '[Update Team] Modify Team Order Failure',
  props<{  payload : HttpErrorResponse }>()
);
