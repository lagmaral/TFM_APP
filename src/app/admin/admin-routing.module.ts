import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffListComponent } from './components/staff-list/staff-list.component';
import { StaffDetailComponent } from './components/staff-detail/staff-detail.component';
import { HomeComponent } from '../shared/components/home/home.component';
import { AdminGuard } from './guard/admin.guard';



const routes: Routes = [
  {
    path: 'staff',
    component: StaffListComponent,
    canActivate: [AdminGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'staff-detail',
    component: StaffDetailComponent,
    canActivate: [AdminGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'staff-detail/:id',
    component: StaffDetailComponent,
    canActivate: [AdminGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'unauthorized',
    component: HomeComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
