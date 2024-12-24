import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { AuthModule } from './auth/auth.module';
import { LoginComponent } from './auth/components/login/login.component';
import { StaffListComponent } from './admin/components/staff-list/staff-list.component';

/*const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'posts', loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule) }
];*/

const routes: Routes = [
 // { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige a 'home'
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
  { path: '**', redirectTo: 'home' }, // Redirige a 'home' como fallback
];

@NgModule({
  imports: [AuthModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
