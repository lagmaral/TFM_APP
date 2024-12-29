import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ResultadosHomeComponent } from './components/resultados-home/resultados-home.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  providers:[DatePipe],
  declarations: [ResultadosHomeComponent],
  imports: [
    IonicModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ResultadosHomeComponent]
})
export class ResultadosModule { }
