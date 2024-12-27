import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { StaffDTO } from '../models/staff.dto';
import { PaginatedFilter, PlayerPaginatedResponse, StaffPaginatedResponse, TeamPaginatedResponse } from '../reducers';
import { EquipoDTO } from '../models/equipo.dto';
import { PosicionDTO } from '../models/posicion.dto';
import { JugadorDTO } from '../models/jugador.dto';
import { PlantillaDTO } from '../models/plantilla.dto';
import { CargoDTO } from '../models/cargo.dto';
import { EquipoStaffDTO } from '../models/equipo-staff.dto';
import { RivalDTO } from '../models/rival.dto';

export const setFilters = createAction(
  '[Admin] Set Filters',
  props<{ paginated :PaginatedFilter }>() // Ajusta el tipo según tus necesidades
);

export const clearFilters = createAction('[Admin] Clear Filters');

export const cleanDetail = createAction('[Admin] Clear Detail');

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
  props<{ id: number, navigate:boolean }>()
);

export const getTeamByIdSuccess = createAction(
  '[Search Team By ID] Search Team By ID Success',
  props<{ item: EquipoDTO, navigate:boolean }>()
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

//catalogos

export const searchTeamCatalog = createAction(
  '[search Team Catalog] Search Teams'
);

export const searchTeamCatalogSuccess = createAction(
  '[search Team Catalog] search Team Catalog Success',
  props<{ results: EquipoDTO[]}>()
);

export const searchTeamCatalogFailure = createAction(
  '[search Team Catalog] search Team Catalog Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const searchPosicionesCatalog = createAction(
  '[search Posiciones Catalog] Search Posiciones'
);

export const searchPosicionesCatalogSuccess = createAction(
  '[search Posiciones Catalog] search Posiciones Catalog Success',
  props<{ results: PosicionDTO[]}>()
);

export const searchPosicionesCatalogFailure = createAction(
  '[search Posiciones Catalog] search Posiciones Catalog Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const searchCargoCatalog = createAction(
  '[search Cargo Catalog] Search Cargo'
);

export const searchCargoCatalogSuccess = createAction(
  '[search Cargo Catalog] search Cargo Catalog Success',
  props<{ results: CargoDTO[]}>()
);

export const searchCargoCatalogFailure = createAction(
  '[search TCargoeam Catalog] search Cargo Catalog Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const searchTeamRivalsCatalog= createAction(
  '[search Team Rivals] Search Teams Rivals'
);

export const searchTeamRivalsCatalogSuccess = createAction(
  '[search Team Rivals] search Team RivalsSuccess',
  props<{ results: RivalDTO[]}>()
);

export const searchTeamRivalsCatalogFailure = createAction(
  '[search Team Rivals] search Team Rivals Failure',
  props<{ payload: HttpErrorResponse }>()
);


// Search with filters
export const searchPlayersWithFilters = createAction(
  '[Search Players] Search With Filters',
  props<{ paginated:PaginatedFilter }>()
);

export const searchPlayersWithFiltersSuccess = createAction(
  '[Search Players] Search With Filters Success',
  props<{ results: PlayerPaginatedResponse}>()
);

export const searchPlayersWithFiltersFailure = createAction(
  '[Search Players] Search With Filters Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getPlayerById = createAction(
  '[Search Players By ID] Search Players By ID',
  props<{ id: number }>()
);

export const getPlayerByIdSuccess = createAction(
  '[Search Players By ID] Search Players By ID Success',
  props<{ item: JugadorDTO }>()
);

export const getPlayerByIdFailure = createAction(
  '[Search Players By ID] Search Players By ID Failure',
  props<{ payload: HttpErrorResponse }>()
);

// Save new Players
export const saveNewPlayer= createAction(
  '[New Players] Save New Players',
  props<{ item: FormData, paginated:PaginatedFilter }>()
);

export const saveNewPlayerSuccess = createAction(
  '[New Players] Save New Players Success',
  props<{ item: JugadorDTO, paginated:PaginatedFilter }>()
);

export const saveNewPlayerFailure = createAction(
  '[New Players] Save New Players Failure',
  props<{ payload: HttpErrorResponse }>()
);

// Modify existing Players
export const modifyPlayer = createAction(
  '[Update Players] Modify Players',
  props<{ id: number, item: FormData, paginated:PaginatedFilter }>()
);

export const modifyPlayerSuccess = createAction(
  '[Update Players] Modify Players Success',
  props<{ id: number, item: JugadorDTO, paginated:PaginatedFilter }>()
);

export const modifyPlayerFailure = createAction(
  '[Update Players] Modify Players Failure',
  props<{  payload : HttpErrorResponse }>()
);
 //Delete exisiting Players
export const deletePlayer = createAction(
  '[Delete Players] Delete Players',
  props<{ id: number, paginated:PaginatedFilter }>()
);

export const deletePlayerSuccess = createAction(
  '[Delete Players] Delete Players Success',
  props<{ id: number, paginated:PaginatedFilter }>()
);

export const deletePlayerFailure = createAction(
  '[Delete Players] Delete Players Failure',
  props<{  payload : HttpErrorResponse }>()
);

export const getPlayerTeamsById = createAction(
  '[Search Players Teams By ID] Search Players Teams By ID',
  props<{ id: number }>()
);

export const getPlayerTeamsByIdSuccess = createAction(
  '[Search Players Teams By ID] Search Players Teams By ID Success',
  props<{ item: JugadorDTO }>()
);

export const getPlayerTeamsByIdFailure = createAction(
  '[Search Players Teams By ID] Search Players Teams By ID Failure',
  props<{  payload : HttpErrorResponse }>()
);

export const saveNewPlayerTeam= createAction(
  '[New Player Team] Save New Player Team',
  props<{ item: PlantillaDTO, paginated:PaginatedFilter }>()
);

export const saveNewPlayerTeamSuccess = createAction(
  '[New Player Team] Save New Player Team Success',
  props<{ item: JugadorDTO, paginated:PaginatedFilter }>()
);

export const saveNewPlayerTeamFailure = createAction(
  '[New Player Team] Save New Players Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const deletePlayerTeam = createAction(
  '[Delete Player Team] Delete Player Team',
  props<{ id: number, paginated:PaginatedFilter }>()
);

export const deletePlayerTeamSuccess = createAction(
  '[Delete Player Team] Delete Player Team Success',
  props<{ id: number, paginated:PaginatedFilter }>()
);

export const deletePlayerTeamFailure = createAction(
  '[Delete Player Team] Delete Player TeamFailure',
  props<{  payload : HttpErrorResponse }>()
);


export const getStaffTeamsById = createAction(
  '[Search Staff Teams By ID] Search Staff Teams By ID',
  props<{ id: number }>()
);

export const getStaffTeamsByIdSuccess = createAction(
  '[Search Staff Teams By ID] Search Staff Teams By ID Success',
  props<{ item: StaffDTO }>()
);

export const getStaffTeamsByIdFailure = createAction(
  '[Search Staff Teams By ID] Search Staff Teams By ID Failure',
  props<{  payload : HttpErrorResponse }>()
);

export const saveNewStaffTeam= createAction(
  '[New Staff Team] Save New Staff Team',
  props<{ item: EquipoStaffDTO, paginated:PaginatedFilter }>()
);

export const saveNewStaffTeamSuccess = createAction(
  '[New Staff Team] Save New Staff Team Success',
  props<{ item: StaffDTO, paginated:PaginatedFilter }>()
);

export const saveNewStaffTeamFailure = createAction(
  '[New Staff Team] Save New Staff Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const deleteStaffTeam = createAction(
  '[Delete Staff Team] Delete Staff Team',
  props<{ id: number, paginated:PaginatedFilter }>()
);

export const deleteStaffTeamSuccess = createAction(
  '[Delete Staff Team] Delete Staff Team Success',
  props<{ id: number, paginated:PaginatedFilter }>()
);

export const deleteStaffTeamFailure = createAction(
  '[Delete Staff Team] Delete Staff TeamFailure',
  props<{  payload : HttpErrorResponse }>()
);


