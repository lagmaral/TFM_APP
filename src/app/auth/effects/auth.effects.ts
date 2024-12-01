import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, finalize, map } from 'rxjs/operators';
import * as AuthActions from '../actions';
import { AuthService } from '../services/auth.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { UsuarioDTO } from '../models/usuario.dto';
import { ModalControlService } from '../services/modal.service';
import { ToastSpinnerService } from 'src/app/shared/services/toast-spinner.service';


@Injectable()
export class AuthEffects {
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private toastSpinnerService: ToastSpinnerService,
    private router: Router,
    private modalControlService: ModalControlService,
    private sharedService: SharedService
  ) {
    this.responseOK = false;
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map((usuario: UsuarioDTO) => {
            if (usuario.token) {
              localStorage.setItem('p-token', usuario.token);
            }
            return AuthActions.loginSuccess({ credentials: usuario });
          }),
          catchError((error) =>
            of(AuthActions.loginFailure({ payload: error }))
          ),
          finalize(async () => {
            await this.sharedService.managementToast(
              'loginFeedback',
              this.responseOK,
              this.errorResponse
            );

            if (this.responseOK) {
              this.router.navigateByUrl('home');
              this.modalControlService.closeModal();
            }
          })
        )
      )
    )
  );
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        map(() => {
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos cargados correctamente', 3000, 'success');
        })
      ),
    { dispatch: false }
  );
  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap(({ user }) => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();

        return this.authService.newUser(user).pipe(  // Esta es la parte que debe devolver un Observable
          map((usuario: UsuarioDTO) => {
            // Cuando la solicitud se realiza con éxito, dispara la acción de éxito
            return AuthActions.registerSuccess({ user: usuario });
          }),
          catchError((error) => {
            // En caso de error, dispara la acción de fallo
            return of(AuthActions.registerFailure({ payload: error }));
          }),
          finalize(() => {
            // Ocultamos el spinner al finalizar la operación (independientemente de éxito o fallo)
            this.toastSpinnerService.hideSpinner();

            // Aquí gestionamos el toast y las acciones post-registro
            this.sharedService.managementToast(
              'registerFeedback',
              this.responseOK,
              this.errorResponse
            );

            // Si el registro es exitoso, redirigimos y cerramos el modal
            if (this.responseOK) {
              this.router.navigateByUrl('home');
              this.modalControlService.closeModal();
            }
          })
        );
      })
    )
  );
  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        map(() => {
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos cargados correctamente', 3000, 'success');
        })
      ),
    { dispatch: false }
  );

  registerFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
          this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 3000, 'danger'); // Muestra el toast de error
        })
      ),
    { dispatch: false }
  );

  getUserByToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getUserByToken),
      exhaustMap(({ userId }) => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();

        return this.authService.getUserbyToken(userId).pipe(  // Esta es la parte que debe devolver un Observable
          map((usuario: UsuarioDTO) => {
            // Cuando la solicitud se realiza con éxito, dispara la acción de éxito
            return AuthActions.getUserByTokenSuccess({ credentials: usuario });
          }),
          catchError((error) => {
            // En caso de error, dispara la acción de fallo
            return of(AuthActions.getUserByTokenFailure({ payload: error }));
          }),
          finalize(() => {
            // Ocultamos el spinner al finalizar la operación (independientemente de éxito o fallo)
            this.toastSpinnerService.hideSpinner();

            // Aquí gestionamos el toast y las acciones post-registro
            this.sharedService.managementToast(
              'registerFeedback',
              this.responseOK,
              this.errorResponse
            );

            // Si el registro es exitoso, redirigimos y cerramos el modal
            if (this.responseOK) {
              this.router.navigateByUrl('home');
              this.modalControlService.closeModal();
            }
          })
        );
      })
    )
  );
  getUserByTokenSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.getUserByTokenSuccess),
        map(() => {
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos cargados correctamente', 3000, 'success');
        })
      ),
    { dispatch: false }
  );
  getUserByTokenFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.getUserByTokenFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
          this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 3000, 'danger'); // Muestra el toast de error
        })
      ),
    { dispatch: false }
  );
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      exhaustMap(({ token }) => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();

        return this.authService.logout(token).pipe(  // Esta es la parte que debe devolver un Observable
          map((usuario: UsuarioDTO) => {
            // Cuando la solicitud se realiza con éxito, dispara la acción de éxito
            return AuthActions.logoutSuccess();
          }),
          catchError((error) => {
            // En caso de error, dispara la acción de fallo
            return of(AuthActions.logoutFailure({ payload: error }));
          }),
          finalize(() => {
            // Ocultamos el spinner al finalizar la operación (independientemente de éxito o fallo)
            this.toastSpinnerService.hideSpinner();
            localStorage.removeItem('p-token');
            // Aquí gestionamos el toast y las acciones post-registro
            this.sharedService.managementToast(
              'registerFeedback',
              this.responseOK,
              this.errorResponse
            );

            // Si el registro es exitoso, redirigimos y cerramos el modal
            if (this.responseOK) {
              this.router.navigateByUrl('home');
            }
          })
        );
      })
    )
  );


  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateUser),
      exhaustMap(({ user }) => {
        // Mostramos el spinner al inicio de la solicitud
        this.toastSpinnerService.showSpinner();

        return this.authService.modifyUser(user).pipe(  // Esta es la parte que debe devolver un Observable
          map((usuario: UsuarioDTO) => {
            // Cuando la solicitud se realiza con éxito, dispara la acción de éxito
            return AuthActions.updateUserSuccess({ userId: usuario.token || '', user: usuario });
          }),
          catchError((error) => {
            // En caso de error, dispara la acción de fallo
            return of(AuthActions.updateUserFailure({ payload: error }));
          }),
          finalize(() => {
            // Ocultamos el spinner al finalizar la operación (independientemente de éxito o fallo)
            this.toastSpinnerService.hideSpinner();

            // Aquí gestionamos el toast y las acciones post-registro
            this.sharedService.managementToast(
              'registerFeedback',
              this.responseOK,
              this.errorResponse
            );

            // Si el registro es exitoso, redirigimos y cerramos el modal
            if (this.responseOK) {
              this.router.navigateByUrl('home');
              this.modalControlService.closeModal();
            }
          })
        );
      })
    )
  );
  updateUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.updateUserSuccess),
        map(() => {
          this.responseOK = true;
          this.toastSpinnerService.showToast('Datos cargados correctamente', 3000, 'success');
        })
      ),
    { dispatch: false }
  );

  updateUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.updateUserFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
          this.toastSpinnerService.showToast('Hubo un error al cargar los datos', 3000, 'danger'); // Muestra el toast de error
        })
      ),
    { dispatch: false }
  );

}

