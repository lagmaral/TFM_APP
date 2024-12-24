import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent//TestComponent, // Componente raíz del módulo "home"
  },
 /* {
    path: 'home',
    component: HomeComponent, // Componente raíz del módulo "home"
  },*/
  /*{
    path: 'teams',
    component: EquiposListComponent, // Componente raíz del módulo "home"
  },*/

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
