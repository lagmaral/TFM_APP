import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';



/*const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'posts', loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule) }
];*/

const routes: Routes = [
 // { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige a 'home'
  /*{
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full' },
  {
    path: 'splash',
    component: SplashComponent
  },*/
  {
    path: 'home',
    loadChildren: () => import('./shared/shared-routing.module').then((m) => m.HomePageRoutingModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin-routing.module').then((m) => m.AdminRoutingModule),
  },
  {
    path: 'teams',
    loadChildren: () => import('./equipos/equipos-routing.module').then((m) => m.EquiposRoutingModule),
  },
  {
    path: 'matches',
    loadChildren: () => import('./partidos/partidos-routing.module').then((m) => m.PartidosRoutingModule)
  },
  { path: '**', redirectTo: 'home' }, // Redirige a 'home' como fallback
];

@NgModule({
  imports: [AuthModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
