import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, finalize, map, mergeMap } from 'rxjs/operators';
import * as AdminActions from '../actions';
import { ToastSpinnerService } from 'src/app/shared/services/toast-spinner.service';
import { StaffService } from '../services/staff.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { StaffDTO } from '../models/staff.dto';
import { PlayerPaginatedResponse, StaffPaginatedResponse, TeamPaginatedResponse } from '../reducers';
import { TeamService } from '../services/team.service';
import { EquipoDTO } from '../models/equipo.dto';
import { PosicionDTO } from '../models/posicion.dto';
import { JugadorService } from '../services/jugador.service';
import { JugadorDTO } from '../models/jugador.dto';
import { CargoDTO } from '../models/cargo.dto';
import { RivalDTO } from '../models/rival.dto';


@Injectable()
export class AdminEffects {
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private staffService: StaffService,
    private teamService: TeamService,
    private jugadorService: JugadorService,
    private toastSpinnerService: ToastSpinnerService,
    private router: Router,
    private sharedService: SharedService,
  ) {
    this.responseOK = false;
  }

  saveNewStaff$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.saveNewStaff),
      exhaustMap(({ item, paginated }) => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();
        return this.staffService.createStaffMember(item).pipe(  // Esta es la parte que debe devolver un Observable
          map((staff: StaffDTO) => {
            // Cuando la solicitud se realiza con éxito, dispara la acción de éxito
            return AdminActions.saveNewStaffSuccess({ item: staff, paginated });
          }),
          catchError((error) => {
            // En caso de error, dispara la acción de fallo
            return of(AdminActions.saveNewStaffFailure({ payload: error }));
          }),
          finalize(() => {
            // Ocultamos el spinner al finalizar la operación (independientemente de éxito o fallo)
            this.toastSpinnerService.hideSpinner();

            // Aquí gestionamos el toast y las acciones post-registro
            this.sharedService.managementToast(
              'divFeedback',
              this.responseOK,
              this.errorResponse
            );

          })
        );
      })
    )
  );
  saveNewStaffSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.saveNewStaffSuccess),
        mergeMap(({ paginated }) => { // Extrae filters de la acción
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos cargados correctamente', 500, 'success');

          // Despacha la acción searchStaffWithFilters con los filtros extraídos
          return [
            AdminActions.searchStaffWithFilters({ paginated }) // Usa los filtros que vienen en la acción
          ];
        })
      )
  );

  saveNewStaffFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.saveNewStaffFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
          this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 500, 'danger'); // Muestra el toast de error
        })
      ),
    { dispatch: false }
  );
  getStaffById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.getStaffById),
      exhaustMap(({ id }) => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();

        return this.staffService.getStaffMemberById(id).pipe(  // Esta es la parte que debe devolver un Observable
          map((item: StaffDTO) => {
            // Cuando la solicitud se realiza con éxito, dispara la acción de éxito
            return AdminActions.getStaffByIdSuccess({ item: item });
          }),
          catchError((error) => {
            // En caso de error, dispara la acción de fallo
            return of(AdminActions.getStaffByIdFailure({ payload: error }));
          }),
          finalize(() => {
            // Ocultamos el spinner al finalizar la operación (independientemente de éxito o fallo)
            this.toastSpinnerService.hideSpinner();

            // Aquí gestionamos el toast y las acciones post-registro
            this.sharedService.managementToast(
              'divFeedback',
              this.responseOK,
              this.errorResponse
            );

          })
        );
      })
    )
  );
  getStaffByIdSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.getStaffByIdSuccess),
        map((item) => {
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos cargados correctamente', 500, 'success');
          this.router.navigateByUrl('/admin/staff-detail/', { state: { inputDTO: item } });
        })
      ),
    { dispatch: false }
  );
  getStaffByIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.getStaffByIdFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
          this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 500, 'danger'); // Muestra el toast de error
        })
      ),
    { dispatch: false }
  );

  modifyStaff$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.modifyStaff),
      exhaustMap(({ id, item, paginated }) => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();
        return this.staffService.modifyStaffMember(id, item).pipe(  // Esta es la parte que debe devolver un Observable
          map((staff: StaffDTO) => {
            // Cuando la solicitud se realiza con éxito, dispara la acción de éxito
            return AdminActions.modifyStaffSuccess({ id, item: staff, paginated });
          }),
          catchError((error) => {
            // En caso de error, dispara la acción de fallo
            return of(AdminActions.modifyStaffFailure({ payload: error }));
          }),
          finalize(() => {
            // Ocultamos el spinner al finalizar la operación (independientemente de éxito o fallo)
            this.toastSpinnerService.hideSpinner();

            // Aquí gestionamos el toast y las acciones post-registro
            this.sharedService.managementToast(
              'divFeedback',
              this.responseOK,
              this.errorResponse
            );

          })
        );
      })
    )
  );

  modifyStaffSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.modifyStaffSuccess),
        mergeMap(({ paginated }) => { // Extrae filters de la acción
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos cargados correctamente', 500, 'success');

          // Despacha la acción searchStaffWithFilters con los filtros extraídos
          return [
            AdminActions.searchStaffWithFilters({ paginated }) // Usa los filtros que vienen en la acción
          ];
        })
      )
  );

  modifyStaffFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.modifyStaffFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
          this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 500, 'danger'); // Muestra el toast de error
        })
      ),
    { dispatch: false }
  );


  searchStaffWithFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.searchStaffWithFilters),
      exhaustMap(({ paginated }) => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();

        return this.staffService.getPaginatedList( paginated.pageNumber, paginated.recordsXPage, paginated.filters).pipe(
          map((response: any) => {
            const staffPaginatedResponse: StaffPaginatedResponse = {
              data: response.data,
              total: response.total
            };
            return AdminActions.searchStaffWithFiltersSuccess({ results: staffPaginatedResponse });
          }),
          catchError((error) => {
            return of(AdminActions.searchStaffWithFiltersFailure({ payload: error }));
          }),
          finalize(() => {
            // Ocultamos el spinner al finalizar la operación (independientemente de éxito o fallo)
            this.toastSpinnerService.hideSpinner();

            // Aquí gestionamos el toast y las acciones post-registro
            this.sharedService.managementToast(
              'divFeedback',
              this.responseOK,
              this.errorResponse
            );

          })
        )
      })
    )
  );
  searchStaffWithFiltersSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.searchStaffWithFiltersSuccess),
        map((item) => {
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos cargados correctamente', 500, 'success');
          this.router.navigate(['/admin/staff']);
        })
      ),
    { dispatch: false }
  );
  searchStaffWithFiltersFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.searchStaffWithFiltersFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
          this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 500, 'danger'); // Muestra el toast de error
        })
      ),
    { dispatch: false }
  );

  deleteStaff$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.deleteStaff),
      exhaustMap(({ id, paginated }) => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();
        return this.staffService.deleteStaffMember(id).pipe(  // Esta es la parte que debe devolver un Observable
          map(() => {
            // Cuando la solicitud se realiza con éxito, dispara la acción de éxito
            return AdminActions.deleteStaffSuccess({ id,paginated });
          }),
          catchError((error) => {
            // En caso de error, dispara la acción de fallo
            return of(AdminActions.deleteStaffFailure({ payload: error }));
          }),
          finalize(() => {
            // Ocultamos el spinner al finalizar la operación (independientemente de éxito o fallo)
            this.toastSpinnerService.hideSpinner();

            // Aquí gestionamos el toast y las acciones post-registro
            this.sharedService.managementToast(
              'divFeedback',
              this.responseOK,
              this.errorResponse
            );

          })
        );
      })
    )
  );

  deleteStaffSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.deleteStaffSuccess),
        mergeMap(({ paginated }) => { // Extrae filters de la acción
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos eliminados correctamente', 500, 'success');

          // Despacha la acción searchStaffWithFilters con los filtros extraídos
          return [
            AdminActions.searchStaffWithFilters({ paginated }) // Usa los filtros que vienen en la acción
          ];
        })
      )
  );

  deleteStaffFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.deleteStaffFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
          this.toastSpinnerService.showToast('Hubo un error al eliminar los datos', 500, 'danger'); // Muestra el toast de error
        })
      ),
    { dispatch: false }
  );

  //Effects de team

  searchTeamsWithFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.searchTeamsWithFilters),
      exhaustMap(({ paginated }) => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();

        return this.teamService.getPaginatedList( paginated.pageNumber, paginated.recordsXPage, paginated.filters).pipe(
          map((response: any) => {
            const teamsPaginatedResponse: TeamPaginatedResponse = {
              data: response.data,
              total: response.total
            };
            return AdminActions.searchTeamsWithFiltersSuccess({ results: teamsPaginatedResponse });
          }),
          catchError((error) => {
            return of(AdminActions.searchTeamsWithFiltersFailure({ payload: error }));
          }),
          finalize(() => {
            // Ocultamos el spinner al finalizar la operación (independientemente de éxito o fallo)
            this.toastSpinnerService.hideSpinner();

            // Aquí gestionamos el toast y las acciones post-registro
            this.sharedService.managementToast(
              'divFeedback',
              this.responseOK,
              this.errorResponse
            );

          })
        )
      })
    )
  );
  searchTeamsWithFiltersSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.searchTeamsWithFiltersSuccess),
        map((item) => {
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos cargados correctamente', 500, 'success');
          this.router.navigate(['/admin/teams']);
        })
      ),
    { dispatch: false }
  );
  searchTeamsWithFiltersFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.searchTeamsWithFiltersFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
          this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 500, 'danger'); // Muestra el toast de error
        })
      ),
    { dispatch: false }
  );

  getTeamById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.getTeamById),
      exhaustMap(({ id, navigate }) => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();

        return this.teamService.getTeamById(id).pipe(  // Esta es la parte que debe devolver un Observable
          map((item: EquipoDTO) => {
            // Cuando la solicitud se realiza con éxito, dispara la acción de éxito
            return AdminActions.getTeamByIdSuccess({ item: item, navigate:navigate});
          }),
          catchError((error) => {
            // En caso de error, dispara la acción de fallo
            return of(AdminActions.getTeamByIdFailure({ payload: error }));
          }),
          finalize(() => {
            // Ocultamos el spinner al finalizar la operación (independientemente de éxito o fallo)
            this.toastSpinnerService.hideSpinner();

            // Aquí gestionamos el toast y las acciones post-registro
            this.sharedService.managementToast(
              'divFeedback',
              this.responseOK,
              this.errorResponse
            );

          })
        );
      })
    )
  );
  getTeamByIdSuccess$ = createEffect(
    () =>

      this.actions$.pipe(
        ofType(AdminActions.getTeamByIdSuccess),
        map((item ) => {
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos cargados correctamente', 500, 'success');

          if(item.navigate)
            this.router.navigateByUrl('/admin/teams-detail/', { state: { inputDTO: item } });
        })
      ),
    { dispatch: false }
  );
  getTeamByIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.getTeamByIdFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
          this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 500, 'danger'); // Muestra el toast de error
        })
      ),
    { dispatch: false }
  );

  saveNewTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.saveNewTeam),
      exhaustMap(({ item, paginated }) => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();
        return this.teamService.createTeam(item).pipe(  // Esta es la parte que debe devolver un Observable
          map((equipo: EquipoDTO) => {
            // Cuando la solicitud se realiza con éxito, dispara la acción de éxito
            return AdminActions.saveNewTeamSuccess({ item: equipo, paginated });
          }),
          catchError((error) => {
            // En caso de error, dispara la acción de fallo
            return of(AdminActions.saveNewTeamFailure({ payload: error }));
          }),
          finalize(() => {
            // Ocultamos el spinner al finalizar la operación (independientemente de éxito o fallo)
            this.toastSpinnerService.hideSpinner();

            // Aquí gestionamos el toast y las acciones post-registro
            this.sharedService.managementToast(
              'divFeedback',
              this.responseOK,
              this.errorResponse
            );

          })
        );
      })
    )
  );
  saveNewTeamSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.saveNewTeamSuccess),
        mergeMap(({ paginated }) => { // Extrae filters de la acción
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos cargados correctamente', 500, 'success');

          // Despacha la acción searchStaffWithFilters con los filtros extraídos
          return [
            AdminActions.searchTeamsWithFilters({ paginated }) // Usa los filtros que vienen en la acción
          ];
        })
      )
  );


  saveNewTeamFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.saveNewTeamFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
          this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 500, 'danger'); // Muestra el toast de error
        })
      ),
    { dispatch: false }
  );
  modifyTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.modifyTeam),
      exhaustMap(({ id, item, paginated }) => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();
        return this.teamService.modifyTeam(id, item).pipe(  // Esta es la parte que debe devolver un Observable
          map((equipo: EquipoDTO) => {
            // Cuando la solicitud se realiza con éxito, dispara la acción de éxito
            return AdminActions.modifyTeamSuccess({ id, item: equipo, paginated });
          }),
          catchError((error) => {
            // En caso de error, dispara la acción de fallo
            return of(AdminActions.modifyTeamFailure({ payload: error }));
          }),
          finalize(() => {
            // Ocultamos el spinner al finalizar la operación (independientemente de éxito o fallo)
            this.toastSpinnerService.hideSpinner();

            // Aquí gestionamos el toast y las acciones post-registro
            this.sharedService.managementToast(
              'divFeedback',
              this.responseOK,
              this.errorResponse
            );
          })
        );
      })
    )
  );

  modifyTeamSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.modifyTeamSuccess),
        mergeMap(({ paginated }) => { // Extrae filters de la acción
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos cargados correctamente', 500, 'success');

          // Despacha la acción searchStaffWithFilters con los filtros extraídos
          return [
            AdminActions.searchTeamsWithFilters({ paginated }) // Usa los filtros que vienen en la acción
          ];
        })
      )
  );

  modifyTeamFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.modifyTeamFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
          this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 500, 'danger'); // Muestra el toast de error
        })
      ),
    { dispatch: false }
  );

  deleteTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.deleteTeam),
      exhaustMap(({ id, paginated }) => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();
        return this.teamService.deleteTeam(id).pipe(  // Esta es la parte que debe devolver un Observable
          map(() => {
            // Cuando la solicitud se realiza con éxito, dispara la acción de éxito
            return AdminActions.deleteTeamSuccess({ id,paginated });
          }),
          catchError((error) => {
            // En caso de error, dispara la acción de fallo
            return of(AdminActions.deleteTeamFailure({ payload: error }));
          }),
          finalize(() => {
            // Ocultamos el spinner al finalizar la operación (independientemente de éxito o fallo)
            this.toastSpinnerService.hideSpinner();

            // Aquí gestionamos el toast y las acciones post-registro
            this.sharedService.managementToast(
              'divFeedback',
              this.responseOK,
              this.errorResponse
            );

          })
        );
      })
    )
  );

  deleteTeamSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.deleteTeamSuccess),
        mergeMap(({ paginated }) => { // Extrae filters de la acción
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos eliminados correctamente', 500, 'success');

          // Despacha la acción searchStaffWithFilters con los filtros extraídos
          return [
            AdminActions.searchTeamsWithFilters({ paginated }) // Usa los filtros que vienen en la acción
          ];
        })
      )
  );

  deleteTeamFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.deleteTeamFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
          this.toastSpinnerService.showToast('Hubo un error al eliminar los datos',500, 'danger'); // Muestra el toast de error
        })
      ),
    { dispatch: false }
  );

  changeOrderTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.changeOrderTeam),
      exhaustMap(({ id, direccion, paginated }) => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();
        return this.teamService.changeTeamOrder(id, direccion).pipe(  // Esta es la parte que debe devolver un Observable
          map((item: any) => {
            // Cuando la solicitud se realiza con éxito, dispara la acción de éxito
            return AdminActions.changeOrderSuccess({ id, item, paginated });
          }),
          catchError((error) => {
            // En caso de error, dispara la acción de fallo
            return of(AdminActions.changeOrderFailure({ payload: error }));
          }),
          finalize(() => {
            // Ocultamos el spinner al finalizar la operación (independientemente de éxito o fallo)
            this.toastSpinnerService.hideSpinner();

            // Aquí gestionamos el toast y las acciones post-registro
            this.sharedService.managementToast(
              'divFeedback',
              this.responseOK,
              this.errorResponse
            );
          })
        );
      })
    )
  );

  changeOrderSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.changeOrderSuccess),
        mergeMap(({ paginated }) => { // Extrae filters de la acción
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos cargados correctamente', 500, 'success');

          // Despacha la acción searchStaffWithFilters con los filtros extraídos
          return [
            AdminActions.searchTeamsWithFilters({ paginated }) // Usa los filtros que vienen en la acción
          ];
        })
      )
  );

  changeOrderFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.changeOrderFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
          this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 500, 'danger'); // Muestra el toast de error
        })
      ),
    { dispatch: false }
  );

  //CARGA DE CATALOGOS
  searchTeamCatalog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.searchTeamCatalog),
      exhaustMap(() => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();

        return this.teamService.getAllTeams().pipe(
          map((results: EquipoDTO[]) => {
            return AdminActions.searchTeamCatalogSuccess({ results });
          }),
          catchError((error) => {
            return of(AdminActions.searchTeamCatalogFailure({ payload: error }));
          }),
          finalize(() => {
            // Ocultamos el spinner al finalizar la operación (independientemente de éxito o fallo)
            this.toastSpinnerService.hideSpinner();

            // Aquí gestionamos el toast y las acciones post-registro
            this.sharedService.managementToast(
              'divFeedback',
              this.responseOK,
              this.errorResponse
            );

          })
        )
      })
    )
  );
  searchTeamCatalogSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.searchTeamCatalogSuccess),
        map((item) => {
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos cargados correctamente', 500, 'success');
        })
      ),
    { dispatch: false }
  );
  searchTeamCatalogFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.searchTeamCatalogFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
          this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 500, 'danger'); // Muestra el toast de error
        })
      ),
    { dispatch: false }
  );

  searchPosicionesCatalog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.searchPosicionesCatalog),
      exhaustMap(() => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();

        return this.teamService.getAllPosiciones().pipe(
          map((results: PosicionDTO[]) => {
            return AdminActions.searchPosicionesCatalogSuccess({ results: results });
          }),
          catchError((error) => {
            return of(AdminActions.searchPosicionesCatalogFailure({ payload: error }));
          }),
          finalize(() => {
            // Ocultamos el spinner al finalizar la operación (independientemente de éxito o fallo)
            this.toastSpinnerService.hideSpinner();

            // Aquí gestionamos el toast y las acciones post-registro
            this.sharedService.managementToast(
              'divFeedback',
              this.responseOK,
              this.errorResponse
            );

          })
        )
      })
    )
  );
  searchPosicionesCatalogSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.searchPosicionesCatalogSuccess),
        map((item) => {
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos cargados correctamente', 500, 'success');
        })
      ),
    { dispatch: false }
  );
  searchPosicionesCatalogFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.searchPosicionesCatalogFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
          this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 500, 'danger'); // Muestra el toast de error
        })
      ),
    { dispatch: false }
  );

  searchCargoCatalog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.searchCargoCatalog),
      exhaustMap(() => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();

        return this.staffService.getAllCargos().pipe(
          map((results: CargoDTO[]) => {
            return AdminActions.searchCargoCatalogSuccess({ results });
          }),
          catchError((error) => {
            return of(AdminActions.searchCargoCatalogFailure({ payload: error }));
          }),
          finalize(() => {
            // Ocultamos el spinner al finalizar la operación (independientemente de éxito o fallo)
            this.toastSpinnerService.hideSpinner();

            // Aquí gestionamos el toast y las acciones post-registro
            this.sharedService.managementToast(
              'divFeedback',
              this.responseOK,
              this.errorResponse
            );

          })
        )
      })
    )
  );
  searchCargoCatalogSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.searchCargoCatalogSuccess),
        map((item) => {
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos cargados correctamente', 500, 'success');
        })
      ),
    { dispatch: false }
  );
  searchCargoCatalogFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.searchCargoCatalogFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
          this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 500, 'danger'); // Muestra el toast de error
        })
      ),
    { dispatch: false }
  );


  searchTeamRivalsCatalog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.searchTeamRivalsCatalog),
      exhaustMap(() => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();

        return this.teamService.getAllRivals().pipe(
          map((results: RivalDTO[]) => {
            return AdminActions.searchTeamRivalsCatalogSuccess({ results });
          }),
          catchError((error) => {
            return of(AdminActions.searchTeamRivalsCatalogFailure({ payload: error }));
          }),
          finalize(() => {
            // Ocultamos el spinner al finalizar la operación (independientemente de éxito o fallo)
            this.toastSpinnerService.hideSpinner();

            // Aquí gestionamos el toast y las acciones post-registro
            this.sharedService.managementToast(
              'divFeedback',
              this.responseOK,
              this.errorResponse
            );

          })
        )
      })
    )
  );
  searchTeamRivalsCatalogSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.searchTeamRivalsCatalogSuccess),
        map((item) => {
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos cargados correctamente', 500, 'success');
        })
      ),
    { dispatch: false }
  );
  searchTeamRivalsCatalogFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.searchTeamRivalsCatalogFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
          this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 500, 'danger'); // Muestra el toast de error
        })
      ),
    { dispatch: false }
  );


  //Effects de Player
  searchPlayersWithFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.searchPlayersWithFilters),
      exhaustMap(({ paginated }) => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();

        return this.jugadorService.getPaginatedList( paginated.pageNumber, paginated.recordsXPage, paginated.filters).pipe(
          map((response: any) => {
            const playerPaginatedResponse: PlayerPaginatedResponse = {
              data: response.data,
              total: response.total
            };
            return AdminActions.searchPlayersWithFiltersSuccess({ results: playerPaginatedResponse });
          }),
          catchError((error) => {
            return of(AdminActions.searchPlayersWithFiltersFailure({ payload: error }));
          }),
          finalize(() => {
            // Ocultamos el spinner al finalizar la operación (independientemente de éxito o fallo)
            this.toastSpinnerService.hideSpinner();

            // Aquí gestionamos el toast y las acciones post-registro
            this.sharedService.managementToast(
              'divFeedback',
              this.responseOK,
              this.errorResponse
            );

          })
        )
      })
    )
  );
  searchPlayersWithFiltersSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.searchPlayersWithFiltersSuccess),
        map((item) => {
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos cargados correctamente', 500, 'success');
          this.router.navigate(['/admin/players']);
        })
      ),
    { dispatch: false }
  );
  searchPlayersWithFiltersFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.searchPlayersWithFiltersFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
          this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 500, 'danger'); // Muestra el toast de error
        })
      ),
    { dispatch: false }
  );

  getPlayerById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.getPlayerById),
      exhaustMap(({ id }) => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();

        return this.jugadorService.getPlayerById(id).pipe(  // Esta es la parte que debe devolver un Observable
          map((item: JugadorDTO) => {
            // Cuando la solicitud se realiza con éxito, dispara la acción de éxito
            return AdminActions.getPlayerByIdSuccess({ item });
          }),
          catchError((error) => {
            // En caso de error, dispara la acción de fallo
            return of(AdminActions.getPlayerByIdFailure({ payload: error }));
          }),
          finalize(() => {
            // Ocultamos el spinner al finalizar la operación (independientemente de éxito o fallo)
            this.toastSpinnerService.hideSpinner();

            // Aquí gestionamos el toast y las acciones post-registro
            this.sharedService.managementToast(
              'divFeedback',
              this.responseOK,
              this.errorResponse
            );

          })
        );
      })
    )
  );
  getPlayerByIdSuccess$ = createEffect(
    () =>

      this.actions$.pipe(
        ofType(AdminActions.getPlayerByIdSuccess),
        map((item) => {
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos cargados correctamente', 500, 'success');
          this.router.navigateByUrl('/admin/players-detail/', { state: { inputDTO: item } });
        })
      ),
    { dispatch: false }
  );
  getPlayerByIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.getPlayerByIdFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
          this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 500, 'danger'); // Muestra el toast de error
        })
      ),
    { dispatch: false }
  );

  saveNewPlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.saveNewPlayer),
      exhaustMap(({ item, paginated }) => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();
        return this.jugadorService.createPlayer(item).pipe(  // Esta es la parte que debe devolver un Observable
          map((item: JugadorDTO) => {
            // Cuando la solicitud se realiza con éxito, dispara la acción de éxito
            return AdminActions.saveNewPlayerSuccess({ item, paginated });
          }),
          catchError((error) => {
            // En caso de error, dispara la acción de fallo
            return of(AdminActions.saveNewPlayerFailure({ payload: error }));
          }),
          finalize(() => {
            // Ocultamos el spinner al finalizar la operación (independientemente de éxito o fallo)
            this.toastSpinnerService.hideSpinner();

            // Aquí gestionamos el toast y las acciones post-registro
            this.sharedService.managementToast(
              'divFeedback',
              this.responseOK,
              this.errorResponse
            );

          })
        );
      })
    )
  );
  saveNewPlayerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.saveNewPlayerSuccess),
        mergeMap(({ paginated }) => { // Extrae filters de la acción
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos cargados correctamente', 500, 'success');

          // Despacha la acción searchStaffWithFilters con los filtros extraídos
          return [
            AdminActions.searchPlayersWithFilters({ paginated }) // Usa los filtros que vienen en la acción
          ];
        })
      )
  );


saveNewPlayerFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.saveNewPlayerFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
          this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 500, 'danger'); // Muestra el toast de error
        })
      ),
    { dispatch: false }
  );

  modifyPlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.modifyPlayer),
      exhaustMap(({ id, item, paginated }) => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();
        return this.jugadorService.modifyPlayer(id, item).pipe(  // Esta es la parte que debe devolver un Observable
          map((item: JugadorDTO) => {
            // Cuando la solicitud se realiza con éxito, dispara la acción de éxito
            return AdminActions.modifyPlayerSuccess({ id, item , paginated });
          }),
          catchError((error) => {
            // En caso de error, dispara la acción de fallo
            return of(AdminActions.modifyPlayerFailure({ payload: error }));
          }),
          finalize(() => {
            // Ocultamos el spinner al finalizar la operación (independientemente de éxito o fallo)
            this.toastSpinnerService.hideSpinner();

            // Aquí gestionamos el toast y las acciones post-registro
            this.sharedService.managementToast(
              'divFeedback',
              this.responseOK,
              this.errorResponse
            );
          })
        );
      })
    )
  );

  modifyPlayerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.modifyPlayerSuccess),
        mergeMap(({ paginated }) => { // Extrae filters de la acción
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos cargados correctamente', 500, 'success');

          // Despacha la acción searchStaffWithFilters con los filtros extraídos
          return [
            AdminActions.searchPlayersWithFilters({ paginated }) // Usa los filtros que vienen en la acción
          ];
        })
      )
  );

  modifyPlayerFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.modifyPlayerFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
          this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 500, 'danger'); // Muestra el toast de error
        })
      ),
    { dispatch: false }
  );

  deletePlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.deletePlayer),
      exhaustMap(({ id, paginated }) => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();
        return this.jugadorService.deletePlayer(id).pipe(  // Esta es la parte que debe devolver un Observable
          map(() => {
            // Cuando la solicitud se realiza con éxito, dispara la acción de éxito
            return AdminActions.deletePlayerSuccess({ id,paginated });
          }),
          catchError((error) => {
            // En caso de error, dispara la acción de fallo
            return of(AdminActions.deletePlayerFailure({ payload: error }));
          }),
          finalize(() => {
            // Ocultamos el spinner al finalizar la operación (independientemente de éxito o fallo)
            this.toastSpinnerService.hideSpinner();

            // Aquí gestionamos el toast y las acciones post-registro
            this.sharedService.managementToast(
              'divFeedback',
              this.responseOK,
              this.errorResponse
            );

          })
        );
      })
    )
  );

  deletePlayerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.deletePlayerSuccess),
        mergeMap(({ paginated }) => { // Extrae filters de la acción
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos eliminados correctamente', 500, 'success');

          // Despacha la acción searchStaffWithFilters con los filtros extraídos
          return [
            AdminActions.searchPlayersWithFilters({ paginated }) // Usa los filtros que vienen en la acción
          ];
        })
      )
  );

  deletePlayerFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.deletePlayerFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
          this.toastSpinnerService.showToast('Hubo un error al eliminar los datos',500, 'danger'); // Muestra el toast de error
        })
      ),
    { dispatch: false }
  );


  getPlayerTeamsById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.getPlayerTeamsById),
      exhaustMap(({ id }) => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();

        return this.jugadorService.getPlayerById(id).pipe(  // Esta es la parte que debe devolver un Observable
          map((item: JugadorDTO) => {
            // Cuando la solicitud se realiza con éxito, dispara la acción de éxito
            return AdminActions.getPlayerTeamsByIdSuccess({ item });
          }),
          catchError((error) => {
            // En caso de error, dispara la acción de fallo
            return of(AdminActions.getPlayerTeamsByIdFailure({ payload: error }));
          }),
          finalize(() => {
            // Ocultamos el spinner al finalizar la operación (independientemente de éxito o fallo)
            this.toastSpinnerService.hideSpinner();

            // Aquí gestionamos el toast y las acciones post-registro
            this.sharedService.managementToast(
              'divFeedback',
              this.responseOK,
              this.errorResponse
            );

          })
        );
      })
    )
  );
  getPlayerTeamsByIdSuccess$ = createEffect(
    () =>

      this.actions$.pipe(
        ofType(AdminActions.getPlayerTeamsByIdSuccess),
        map((item) => {
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos cargados correctamente', 500, 'success');
          this.router.navigateByUrl('/admin/players-teams-detail/', { state: { inputDTO: item } });
        })
      ),
    { dispatch: false }
  );
  getPlayerTeamsByIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.getPlayerTeamsByIdFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
          this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 500, 'danger'); // Muestra el toast de error
        })
      ),
    { dispatch: false }
  );

  saveNewPlayerTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.saveNewPlayerTeam),
      exhaustMap(({ item, paginated }) => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();
        return this.jugadorService.createPlayerTeam(item).pipe(  // Esta es la parte que debe devolver un Observable
          map((item: JugadorDTO) => {
            // Cuando la solicitud se realiza con éxito, dispara la acción de éxito
            return AdminActions.saveNewPlayerTeamSuccess({ item, paginated });
          }),
          catchError((error) => {
            // En caso de error, dispara la acción de fallo
            return of(AdminActions.saveNewPlayerTeamFailure({ payload: error }));
          }),
          finalize(() => {
            // Ocultamos el spinner al finalizar la operación (independientemente de éxito o fallo)
            this.toastSpinnerService.hideSpinner();

            // Aquí gestionamos el toast y las acciones post-registro
            this.sharedService.managementToast(
              'divFeedback',
              this.responseOK,
              this.errorResponse
            );

          })
        );
      })
    )
  );
  saveNewPlayerTeamSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.saveNewPlayerTeamSuccess),
        mergeMap(({ paginated }) => { // Extrae filters de la acción
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos cargados correctamente', 500, 'success');

          // Despacha la acción searchStaffWithFilters con los filtros extraídos
          return [
            AdminActions.searchPlayersWithFilters({ paginated }) // Usa los filtros que vienen en la acción
          ];
        })
      )
  );


saveNewPlayerTeamFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.saveNewPlayerTeamFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
          this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 500, 'danger'); // Muestra el toast de error
        })
      ),
    { dispatch: false }
  );

  deletePlayerTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.deletePlayerTeam),
      exhaustMap(({ id, paginated }) => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();
        return this.jugadorService.deletePlayerTeam(id).pipe(  // Esta es la parte que debe devolver un Observable
          map(() => {
            // Cuando la solicitud se realiza con éxito, dispara la acción de éxito
            return AdminActions.deletePlayerTeamSuccess({ id,paginated });
          }),
          catchError((error) => {
            // En caso de error, dispara la acción de fallo
            return of(AdminActions.deletePlayerTeamFailure({ payload: error }));
          }),
          finalize(() => {
            // Ocultamos el spinner al finalizar la operación (independientemente de éxito o fallo)
            this.toastSpinnerService.hideSpinner();

            // Aquí gestionamos el toast y las acciones post-registro
            this.sharedService.managementToast(
              'divFeedback',
              this.responseOK,
              this.errorResponse
            );

          })
        );
      })
    )
  );

  deletePlayerTeamSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.deletePlayerTeamSuccess),
        mergeMap(({ paginated }) => { // Extrae filters de la acción
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos eliminados correctamente', 500, 'success');

          // Despacha la acción searchStaffWithFilters con los filtros extraídos
          return [
            AdminActions.searchPlayersWithFilters({ paginated }) // Usa los filtros que vienen en la acción
          ];
        })
      )
  );

  deletePlayerTeamFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.deletePlayerTeamFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
          this.toastSpinnerService.showToast('Hubo un error al eliminar los datos',500, 'danger'); // Muestra el toast de error
        })
      ),
    { dispatch: false }
  );

  getStaffTeamsById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.getStaffTeamsById),
      exhaustMap(({ id }) => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();

        return this.staffService.getStaffMemberById(id).pipe(  // Esta es la parte que debe devolver un Observable
          map((item: StaffDTO) => {
            // Cuando la solicitud se realiza con éxito, dispara la acción de éxito
            return AdminActions.getStaffTeamsByIdSuccess({ item: item });
          }),
          catchError((error) => {
            // En caso de error, dispara la acción de fallo
            return of(AdminActions.getStaffTeamsByIdFailure({ payload: error }));
          }),
          finalize(() => {
            // Ocultamos el spinner al finalizar la operación (independientemente de éxito o fallo)
            this.toastSpinnerService.hideSpinner();

            // Aquí gestionamos el toast y las acciones post-registro
            this.sharedService.managementToast(
              'divFeedback',
              this.responseOK,
              this.errorResponse
            );

          })
        );
      })
    )
  );
  getStaffTeamsByIdSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.getStaffTeamsByIdSuccess),
        map((item) => {
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos cargados correctamente', 500, 'success');
          this.router.navigateByUrl('/admin/staff-teams-detail/', { state: { inputDTO: item } });
        })
      ),
    { dispatch: false }
  );
  getStaffTeamsByIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.getStaffTeamsByIdFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
          this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 500, 'danger'); // Muestra el toast de error
        })
      ),
    { dispatch: false }
  );

  saveNewStaffTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.saveNewStaffTeam),
      exhaustMap(({ item, paginated }) => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();
        return this.staffService.createStaffTeam(item).pipe(  // Esta es la parte que debe devolver un Observable
          map((item: StaffDTO) => {
            // Cuando la solicitud se realiza con éxito, dispara la acción de éxito
            return AdminActions.saveNewStaffTeamSuccess({ item, paginated });
          }),
          catchError((error) => {
            // En caso de error, dispara la acción de fallo
            return of(AdminActions.saveNewStaffTeamFailure({ payload: error }));
          }),
          finalize(() => {
            // Ocultamos el spinner al finalizar la operación (independientemente de éxito o fallo)
            this.toastSpinnerService.hideSpinner();

            // Aquí gestionamos el toast y las acciones post-registro
            this.sharedService.managementToast(
              'divFeedback',
              this.responseOK,
              this.errorResponse
            );

          })
        );
      })
    )
  );
  saveNewStaffTeamSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.saveNewStaffTeamSuccess),
        mergeMap(({ paginated }) => { // Extrae filters de la acción
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos cargados correctamente', 500, 'success');

          // Despacha la acción searchStaffWithFilters con los filtros extraídos
          return [
            AdminActions.searchStaffWithFilters({ paginated }) // Usa los filtros que vienen en la acción
          ];
        })
      )
  );


saveNewStaffTeamFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.saveNewStaffTeamFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
          this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 500, 'danger'); // Muestra el toast de error
        })
      ),
    { dispatch: false }
  );

  deleteStaffTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.deleteStaffTeam),
      exhaustMap(({ id, paginated }) => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();
        return this.staffService.deleteStaffTeambyId(id).pipe(  // Esta es la parte que debe devolver un Observable
          map(() => {
            // Cuando la solicitud se realiza con éxito, dispara la acción de éxito
            return AdminActions.deleteStaffTeamSuccess({ id,paginated });
          }),
          catchError((error) => {
            // En caso de error, dispara la acción de fallo
            return of(AdminActions.deleteStaffTeamFailure({ payload: error }));
          }),
          finalize(() => {
            // Ocultamos el spinner al finalizar la operación (independientemente de éxito o fallo)
            this.toastSpinnerService.hideSpinner();

            // Aquí gestionamos el toast y las acciones post-registro
            this.sharedService.managementToast(
              'divFeedback',
              this.responseOK,
              this.errorResponse
            );

          })
        );
      })
    )
  );

  deleteStaffTeamSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.deleteStaffTeamSuccess),
        mergeMap(({ paginated }) => { // Extrae filters de la acción
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos eliminados correctamente', 500, 'success');

          // Despacha la acción searchStaffWithFilters con los filtros extraídos
          return [
            AdminActions.searchStaffWithFilters({ paginated }) // Usa los filtros que vienen en la acción
          ];
        })
      )
  );

  deleteStaffTeamFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.deleteStaffTeamFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
          this.toastSpinnerService.showToast('Hubo un error al eliminar los datos',500, 'danger'); // Muestra el toast de error
        })
      ),
    { dispatch: false }
  );

}

