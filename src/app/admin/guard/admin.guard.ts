import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(/*private authService: AuthService, */private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    /*const expectedRole = next.data.expectedRole; // Obtiene el rol esperado desde las rutas
    const userRole = this.authService.getUserRole(); // Método para obtener el rol del usuario

    if (userRole !== expectedRole) {*/
      // Redirige si el rol no coincide
      //this.router.navigate(['/unauthorized']); // Ruta a la que redirigir si no tiene acceso
      //return false;
    /*}*/
    return true; // Permite el acceso si el rol coincide
  }
}
