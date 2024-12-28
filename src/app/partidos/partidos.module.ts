import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartidosEquipoListComponent } from './components/partidos-equipo-list/partidos-equipo-list.component';
import { NuevoPartidoComponent } from './components/nuevo-partido/nuevo-partido.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PartidosRoutingModule } from './partidos-routing.module';
import { PartidosAdminComponent } from './components/partidos-admin/partidos-admin.component';
import { MapaModalComponent } from './components/mapa/mapa.component';



@NgModule({
  declarations: [PartidosEquipoListComponent,NuevoPartidoComponent,PartidosAdminComponent,MapaModalComponent],
  imports: [
    IonicModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PartidosRoutingModule
  ],
  exports: [PartidosEquipoListComponent,NuevoPartidoComponent,PartidosAdminComponent,MapaModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PartidosModule { }

