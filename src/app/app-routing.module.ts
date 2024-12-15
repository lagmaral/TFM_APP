import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { AuthModule } from './auth/auth.module';
import { LoginComponent } from './auth/components/login/login.component';
import { StaffListComponent } from './admin/components/staff-list/staff-list.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('../app/shared/shared-routing.module').then((m) => m.HomePageRoutingModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('../app/admin/admin-routing.module').then((m) => m.AdminRoutingModule),
  },
    /*{
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },{ path: 'home',  component: HomeComponent
    },
    {
      path: 'admin',
      children: [
        { path: 'staff', component: StaffListComponent }
      ]
    }*/
    //{ path: 'login', component: LoginComponent },
    /*,
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  }*/
];

@NgModule({
  imports: [AuthModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
