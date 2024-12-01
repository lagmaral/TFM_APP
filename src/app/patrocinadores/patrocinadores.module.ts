import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatrocinadoresHomeComponent } from './patrocinadores-home/patrocinadores-home.component';



@NgModule({
  declarations: [PatrocinadoresHomeComponent],
  imports: [
    CommonModule
  ],
  exports: [PatrocinadoresHomeComponent]
})
export class PatrocinadoresModule { }
