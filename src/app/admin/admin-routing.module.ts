import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffListComponent } from './components/staff-list/staff-list.component';



const routes: Routes = [
  {
    path: 'staff',
    component: StaffListComponent, // Componente raíz del módulo "home"
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
