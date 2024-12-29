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

    saveNewMatch$ = createEffect(() =>
        this.actions$.pipe(
          ofType(MatchActions.saveNewMatch),
          exhaustMap(({ item }) => {
            // Mostramos el spinner al inicio de la solicitud
            this.toastSpinnerService.showSpinner();
            return this.partidoService.createPartido(item).pipe(  // Esta es la parte que debe devolver un Observable
              map((item: PartidoDTO) => {
                // Cuando la solicitud se realiza con éxito, dispara la acción de éxito
                return MatchActions.saveNewMatchSuccess({ item: item });
              }),
              catchError((error) => {
                // En caso de error, dispara la acción de fallo
                return of(MatchActions.saveNewMatchFailure({ payload: error }));
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

      saveNewMatchSuccess$ = createEffect(() =>
        this.actions$.pipe(
          ofType(MatchActions.saveNewMatchSuccess),
          mergeMap(({ item }) => { // Extrae 'item' directamente de la acción
            this.responseOK = true;
            this.toastSpinnerService.showToast('Datos cargados correctamente', 500, 'success');

            // Aquí puedes usar item.id para despachar otra acción
            return [
              MatchActions.getMatches4TeamsById({ id: item.idequipo }) // Usa item.id en la nueva acción
            ];
          })
        )
      );
      saveNewMatchFailure$ = createEffect(
        () =>
          this.actions$.pipe(
            ofType(MatchActions.saveNewMatchFailure),
            map((error) => {
              this.responseOK = false;
              this.errorResponse = error.payload.error;
              this.sharedService.errorLog(error.payload.error);
              this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 500, 'danger'); // Muestra el toast de error
            })
          ),
        { dispatch: false }
      );

      getMatchById$ = createEffect(() =>
          this.actions$.pipe(
            ofType(MatchActions.getMatchById),
            exhaustMap(({ id }) => {
              // Mostramos el spinner al inicio de la solicitud
              this.toastSpinnerService.showSpinner();

              return this.partidoService.getPartidoById(id).pipe(  // Esta es la parte que debe devolver un Observable
                map((item: PartidoDTO) => {
                  // Cuando la solicitud se realiza con éxito, dispara la acción de éxito
                  return MatchActions.getMatchByIdSuccess({ item });
                }),
                catchError((error) => {
                  // En caso de error, dispara la acción de fallo
                  return of(MatchActions.getMatchByIdFailure({ payload: error }));
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
        getMatchByIdSuccess$ = createEffect(
          () =>

            this.actions$.pipe(
              ofType(MatchActions.getMatchByIdSuccess),
              map((item) => {
                this.responseOK = true;
                this.toastSpinnerService.showToast('Datos cargados correctamente', 500, 'success');
              })
            ),
          { dispatch: false }
        );
        getMatchByIdFailure$ = createEffect(
          () =>
            this.actions$.pipe(
              ofType(MatchActions.getMatchByIdFailure),
              map((error) => {
                this.responseOK = false;
                this.errorResponse = error.payload.error;
                this.sharedService.errorLog(error.payload.error);
                this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 500, 'danger'); // Muestra el toast de error
              })
            ),
          { dispatch: false }
        );

        modifyMatch$ = createEffect(() =>
            this.actions$.pipe(
              ofType(MatchActions.modifyMatch),
              exhaustMap(({ item }) => {
                // Mostramos el spinner al inicio de la solicitud
                this.toastSpinnerService.showSpinner();
                return this.partidoService.updatePartido(item.id, item).pipe(  // Esta es la parte que debe devolver un Observable
                  map((item: PartidoDTO) => {
                    // Cuando la solicitud se realiza con éxito, dispara la acción de éxito
                    return MatchActions.modifyMatchSuccess({ id:item.id, item  });
                  }),
                  catchError((error) => {
                    // En caso de error, dispara la acción de fallo
                    return of(MatchActions.modifyMatchFailure({ payload: error }));
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

          modifyMatchSuccess$ = createEffect(
            () =>
              this.actions$.pipe(
                ofType(MatchActions.modifyMatchSuccess),
                mergeMap(({ item }) => { // Extrae filters de la acción
                  this.responseOK = true;
                  this.toastSpinnerService.showToast('Datos cargados correctamente', 500, 'success');

                  // Despacha la acción searchStaffWithFilters con los filtros extraídos
                  return [
                    MatchActions.getMatches4TeamsById({ id: item.idequipo }) // Usa item.id en la nueva acción
                  ];
                })
              )
          );

          modifyMatchFailure$ = createEffect(
            () =>
              this.actions$.pipe(
                ofType(MatchActions.modifyMatchFailure),
                map((error) => {
                  this.responseOK = false;
                  this.errorResponse = error.payload.error;
                  this.sharedService.errorLog(error.payload.error);
                  this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 500, 'danger'); // Muestra el toast de error
                })
              ),
            { dispatch: false }
          );
          modifyMatchGoal$ = createEffect(() =>
            this.actions$.pipe(
              ofType(MatchActions.modifyMatchGoal),
              exhaustMap(({ item }) => {
                // Mostramos el spinner al inicio de la solicitud
                this.toastSpinnerService.showSpinner();
                return this.partidoService.updateGoals(item.id, item.goleslocal, item.golesvisitante).pipe(  // Esta es la parte que debe devolver un Observable
                  map((item: PartidoDTO) => {
                    // Cuando la solicitud se realiza con éxito, dispara la acción de éxito
                    return MatchActions.modifyMatchGoalSuccess({ id:item.id, item  });
                  }),
                  catchError((error) => {
                    // En caso de error, dispara la acción de fallo
                    return of(MatchActions.modifyMatchGoalFailure({ payload: error }));
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

          modifyMatchGoalSuccess$ = createEffect(
            () =>
              this.actions$.pipe(
                ofType(MatchActions.modifyMatchGoalSuccess),
                mergeMap(({ item }) => { // Extrae filters de la acción
                  this.responseOK = true;
                  this.toastSpinnerService.showToast('Datos cargados correctamente', 500, 'success');

                  // Despacha la acción searchStaffWithFilters con los filtros extraídos
                  return [
                    MatchActions.getMatches4TeamsById({ id: item.idequipo }) // Usa item.id en la nueva acción
                  ];
                })
              )
          );

          modifyMatchGoalFailure$ = createEffect(
            () =>
              this.actions$.pipe(
                ofType(MatchActions.modifyMatchGoalFailure),
                map((error) => {
                  this.responseOK = false;
                  this.errorResponse = error.payload.error;
                  this.sharedService.errorLog(error.payload.error);
                  this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 500, 'danger'); // Muestra el toast de error
                })
              ),
            { dispatch: false }
          );

          getLast7DaysMatches$ = createEffect(() =>
            this.actions$.pipe(
              ofType(MatchActions.getLast7DaysMatches),
              exhaustMap(() => {
                // Mostramos el spinner al inicio de la solicitud
                this.toastSpinnerService.showSpinner();

                return this.partidoService.getPartidosUltimosSeteDias().pipe(  // Esta es la parte que debe devolver un Observable
                  map((results: PartidoDTO[]) => {
                    return MatchActions.getLast7DaysMatchesSuccess({ payload: results });
                  }),
                  catchError((error) => {
                    // En caso de error, dispara la acción de fallo
                    return of(MatchActions.getLast7DaysMatchesFailure({ payload: error }));
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
          getLast7DaysMatchesSuccess$ = createEffect(
            () =>
              this.actions$.pipe(
                ofType(MatchActions.getLast7DaysMatchesSuccess),
                map((item) => {
                  this.responseOK = true;
                  this.toastSpinnerService.showToast('Datos cargados correctamente', 500, 'success');
                  //this.router.navigate(['/teams/plantilla']);
                })
              ),
            { dispatch: false }
          );
          getLast7DaysMatchesFailure$ = createEffect(
            () =>
              this.actions$.pipe(
                ofType(MatchActions.getLast7DaysMatchesFailure),
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

