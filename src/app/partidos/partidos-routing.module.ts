import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartidosEquipoListComponent } from './components/partidos-equipo-list/partidos-equipo-list.component';
import { NuevoPartidoComponent } from './components/nuevo-partido/nuevo-partido.component';
import { ResultadoComponent } from './components/resultado/resultado.component';


const routes: Routes = [
  {
    path: '',
    component: PartidosEquipoListComponent, // Componente raíz del módulo "home"
  },
  {
    path: ':id',
    component: PartidosEquipoListComponent
  },
  {
    path: 'add/:id',
    component: NuevoPartidoComponent
  },
  {
    path: 'modify/:id',
    component: NuevoPartidoComponent
  },
  {
    path: 'resultados/:id',
    component: ResultadoComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartidosRoutingModule {}
