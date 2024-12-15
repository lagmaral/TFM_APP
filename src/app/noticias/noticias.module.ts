import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiasHomeComponent } from './noticias-home/noticias-home.component';



@NgModule({
  declarations: [NoticiasHomeComponent],
  imports: [
    CommonModule
  ],
  exports: [NoticiasHomeComponent]
})
export class NoticiasModule { }
