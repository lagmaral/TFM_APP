import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './shared/components/home/home.component';


const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
    //loadChildren: () => import('./shared/shared-routing.module').then((m) => m.HomePageRoutingModule),
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
  { path: '**', redirectTo: '' }, // Redirige a 'home' como fallback
];

@NgModule({
  imports: [AuthModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
