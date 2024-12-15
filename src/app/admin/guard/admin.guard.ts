import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AppState } from 'src/app/app.reducers';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(    private store: Store<AppState>,private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.store.select('auth').pipe( // Asegúrate de que 'auth' es la parte correcta del estado
      map(authState => {
        const isAdmin = authState.credentials.isAdmin; // Accede a isAdmin

        if (!isAdmin) {
          this.router.navigate(['/unauthorized']); // Redirige si no tiene acceso
          return false;
        }
        return true; // Permite el acceso si es admin
      })
    );
  }
}
