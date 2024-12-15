import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquiposHomeComponent } from './equipos-home/equipos-home.component';



@NgModule({
  declarations: [EquiposHomeComponent],
  imports: [
    CommonModule
  ],
  exports: [EquiposHomeComponent]
})
export class EquiposModule { }
