import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquiposHomeComponent } from './components/equipos-home/equipos-home.component';
import { EquiposListComponent } from './components/equipos-list/equipos-list.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { EquipoPlantillaComponent } from './components/equipo-plantilla/equipo-plantilla.component';
import { DetalleMiembroComponent } from './components/detalle-miembro/detalle-miembro.component';
import { EquiposRoutingModule } from './equipos-routing.module';
import { EquipoAdminComponent } from './components/equipo-admin/equipo-admin.component';



@NgModule({
  declarations: [EquiposHomeComponent,EquiposListComponent,EquipoPlantillaComponent,DetalleMiembroComponent,EquipoAdminComponent],
  imports: [
    IonicModule.forRoot(),
    CommonModule,
    FormsModule,
    SharedModule,
    EquiposRoutingModule
  ],
  exports: [EquiposHomeComponent,EquiposListComponent,EquipoPlantillaComponent,DetalleMiembroComponent,EquipoAdminComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EquiposModule { }
