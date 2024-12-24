import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipoPlantillaComponent } from './components/equipo-plantilla/equipo-plantilla.component';
import { EquiposListComponent } from './components/equipos-list/equipos-list.component';
import { DetalleMiembroComponent } from './components/detalle-miembro/detalle-miembro.component';


const routes: Routes = [
  {
    path: '',
    component: EquiposListComponent, // Componente raíz del módulo "home"
  },

  {
    path: 'plantilla/:origen',
    component: EquipoPlantillaComponent, // Componente raíz del módulo "home"
  },
  { path: 'detalleStaff/:id', component: DetalleMiembroComponent },
  { path: 'detalleJugador/:id', component: DetalleMiembroComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquiposRoutingModule {}
