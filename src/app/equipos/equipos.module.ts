import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquiposHomeComponent } from './components/equipos-home/equipos-home.component';
import { EquiposListComponent } from './components/equipos-list/equipos-list.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [EquiposHomeComponent,EquiposListComponent],
  imports: [
    IonicModule.forRoot(),
    CommonModule,
    FormsModule,
    SharedModule,
  ],
  exports: [EquiposHomeComponent,EquiposListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EquiposModule { }
