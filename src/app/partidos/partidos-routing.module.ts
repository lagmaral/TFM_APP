import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartidosEquipoListComponent } from './partidos-equipo-list/partidos-equipo-list.component';
import { NuevoPartidoComponent } from './nuevo-partido/nuevo-partido.component';


const routes: Routes = [
  {
    path: '',
    component: PartidosEquipoListComponent, // Componente raíz del módulo "home"
  },
  {
    path: ':id',
    component: PartidosEquipoListComponent
  }, {
    path: 'add/:id',
    component: NuevoPartidoComponent
  }

/*
  {
    path: 'plantilla/:origen',
    component: EquipoPlantillaComponent, // Componente raíz del módulo "home"
  },
  { path: 'detalleStaff/:id', component: DetalleMiembroComponent },
  { path: 'detalleJugador/:id', component: DetalleMiembroComponent }*/

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartidosRoutingModule {}
