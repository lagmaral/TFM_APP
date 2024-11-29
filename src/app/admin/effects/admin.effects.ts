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
import { StaffPaginatedResponse } from '../reducers';


@Injectable()
export class AdminEffects {
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private staffService: StaffService,
    private toastSpinnerService: ToastSpinnerService,
    private router: Router,
    private sharedService: SharedService,
  ) {
    this.responseOK = false;
  }

  saveNewStaff$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.saveNewStaff),
      exhaustMap(({ item }) => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();
        return this.staffService.createStaffMember(item).pipe(  // Esta es la parte que debe devolver un Observable
          map((staff: StaffDTO) => {
            // Cuando la solicitud se realiza con éxito, dispara la acción de éxito
            return AdminActions.saveNewStaffSuccess({ item: staff });
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

            // Si el registro es exitoso, redirigimos y cerramos el modal
            if (this.responseOK) {
              this.router.navigateByUrl('/admin/staff');
            }
          })
        );
      })
    )
  );

  saveNewStaffSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.saveNewStaffSuccess),
        map(() => {
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos cargados correctamente', 3000, 'success');
        })
      ),
    { dispatch: false }
  );

  saveNewStaffFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.saveNewStaffFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
          this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 3000, 'danger'); // Muestra el toast de error
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
          this.toastSpinnerService.showToast('Datos cargados correctamente', 3000, 'success');
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
          this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 3000, 'danger'); // Muestra el toast de error
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

            // Si el registro es exitoso, redirigimos y cerramos el modal
            if (this.responseOK) {
              this.router.navigateByUrl('/admin/staff');
            }
          })
        );
      })
    )
  );

  /*modifyStaffSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.modifyStaffSuccess),
        map(() => {
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos cargados correctamente', 3000, 'success');
        })
      ),
    { dispatch: false }
  );*/

  modifyStaffSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.modifyStaffSuccess),
        mergeMap(({ paginated }) => { // Extrae filters de la acción
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos cargados correctamente', 3000, 'success');

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
          this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 3000, 'danger'); // Muestra el toast de error
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
          this.toastSpinnerService.showToast('Datos cargados correctamente', 3000, 'success');
          //this.router.navigateByUrl('/admin/staff-detail/', { state: { inputDTO: item } });
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
          this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 3000, 'danger'); // Muestra el toast de error
        })
      ),
    { dispatch: false }
  );

  deleteStaff$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.deleteStaff),
      exhaustMap(({ id }) => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();
        return this.staffService.deleteStaffMember(id).pipe(  // Esta es la parte que debe devolver un Observable
          map(() => {
            // Cuando la solicitud se realiza con éxito, dispara la acción de éxito
            return AdminActions.deleteStaffSuccess({ id });
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

            // Si el registro es exitoso, redirigimos y cerramos el modal
            if (this.responseOK) {
              this.router.navigateByUrl('/admin/staff');
            }
          })
        );
      })
    )
  );

  deleteStaffSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.deleteStaffSuccess),
        map(() => {
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos eliminados correctamente', 3000, 'success');
        })
      ),
    { dispatch: false }
  );

  deleteStaffFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.deleteStaffFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
          this.toastSpinnerService.showToast('Hubo un error al eliminar los datos', 3000, 'danger'); // Muestra el toast de error
        })
      ),
    { dispatch: false }
  );
}

