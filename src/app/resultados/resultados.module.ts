import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadosHomeComponent } from './resultados-home/resultados-home.component';



@NgModule({
  declarations: [ResultadosHomeComponent],
  imports: [
    CommonModule
  ],
  exports: [ResultadosHomeComponent]
})
export class ResultadosModule { }
