import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, finalize, map, mergeMap } from 'rxjs/operators';
import * as TeamActions from '../actions';
import { ToastSpinnerService } from 'src/app/shared/services/toast-spinner.service';
import { TeamService } from 'src/app/admin/services/team.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { EquipoDTO } from 'src/app/admin/models/equipo.dto';
import { EquipoStaffDTO } from 'src/app/admin/models/equipo-staff.dto';
import { PlantillaDTO } from 'src/app/admin/models/plantilla.dto';



@Injectable()
export class TeamEffects {
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private teamService: TeamService,
    private sharedService: SharedService,
    private toastSpinnerService: ToastSpinnerService,
    private router: Router,

  ) {
    this.responseOK = false;
  }




  searchActiveTeams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamActions.searchActiveTeams),
      exhaustMap(() => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();

        return this.teamService.getAllActiveTeams().pipe(
          map((results: EquipoDTO[]) => {
            return TeamActions.searchActiveTeamsSuccess({ results });
          }),
          catchError((error) => {
            return of(TeamActions.searchActiveTeamsFailure({ payload: error }));
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
  searchActiveTeamsSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TeamActions.searchActiveTeamsSuccess),
        map((item) => {
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos cargados correctamente', 500, 'success');
        })
      ),
    { dispatch: false }
  );
  searchActiveTeamsFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TeamActions.searchActiveTeamsFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
          this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 500, 'danger'); // Muestra el toast de error
        })
      ),
    { dispatch: false }
  );


  getStaffTeamsById$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TeamActions.getStaffTeamsById),
        exhaustMap(({ id }) => {
          // Mostramos el spinner al inicio de la solicitud
          this.toastSpinnerService.showSpinner();

          return this.teamService.getPlantillaTeamById(id).pipe(  // Esta es la parte que debe devolver un Observable
            map((item: {equipo: EquipoDTO, staff: EquipoStaffDTO[], jugadores: PlantillaDTO[]}) => {
              // Cuando la solicitud se realiza con éxito, dispara la acción de éxito
              return TeamActions.getStaffTeamsByIdSuccess({ payload: item });
            }),
            catchError((error) => {
              // En caso de error, dispara la acción de fallo
              return of(TeamActions.getStaffTeamsByIdFailure({ payload: error }));
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
          ofType(TeamActions.getStaffTeamsByIdSuccess),
          map((item) => {
            this.responseOK = true;
            this.toastSpinnerService.showToast('Datos cargados correctamente', 500, 'success');
            //this.router.navigate(['/teams/plantilla']);
          })
        ),
      { dispatch: false }
    );
    getStaffTeamsByIdFailure$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(TeamActions.getStaffTeamsByIdFailure),
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

