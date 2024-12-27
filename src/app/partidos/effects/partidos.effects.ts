import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, finalize, map, mergeMap } from 'rxjs/operators';
import * as MatchActions from '../actions';
import { ToastSpinnerService } from 'src/app/shared/services/toast-spinner.service';

import { SharedService } from 'src/app/shared/services/shared.service';
import { PartidoService } from '../services/partido.service';
import { PartidoDTO } from '../models/partido.dto';



@Injectable()
export class PartidoEffects {
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private partidoService: PartidoService,
    private sharedService: SharedService,
    private toastSpinnerService: ToastSpinnerService,
    private router: Router,

  ) {
    this.responseOK = false;
  }

  getMatches4TeamsById$ = createEffect(() =>
      this.actions$.pipe(
        ofType(MatchActions.getMatches4TeamsById),
        exhaustMap(({ id }) => {
          // Mostramos el spinner al inicio de la solicitud
          this.toastSpinnerService.showSpinner();

          return this.partidoService.getPartidosByEquipoId(id).pipe(  // Esta es la parte que debe devolver un Observable
            map((results: PartidoDTO[]) => {
              return MatchActions.getMatches4TeamsByIdSuccess({ payload: results });
            }),
            catchError((error) => {
              // En caso de error, dispara la acción de fallo
              return of(MatchActions.getMatches4TeamsByIdFailure({ payload: error }));
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
    getMatches4TeamsByIdSuccess$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(MatchActions.getMatches4TeamsByIdSuccess),
          map((item) => {
            this.responseOK = true;
            this.toastSpinnerService.showToast('Datos cargados correctamente', 500, 'success');
            //this.router.navigate(['/teams/plantilla']);
          })
        ),
      { dispatch: false }
    );
    getMatches4TeamsByIdFailure$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(MatchActions.getMatches4TeamsByIdFailure),
          map((error) => {
            this.responseOK = false;
            this.errorResponse = error.payload.error;
            this.sharedService.errorLog(error.payload.error);
            this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 500, 'danger'); // Muestra el toast de error
          })
        ),
      { dispatch: false }
    );

}

