import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { StaffListComponent } from './components/staff-list/staff-list.component';



@NgModule({
  declarations: [StaffListComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    StaffListComponent
  ]
})
export class AdminModule { }
