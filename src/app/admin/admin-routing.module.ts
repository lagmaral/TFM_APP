import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffListComponent } from './components/staff-list/staff-list.component';
import { StaffDetailComponent } from './components/staff-detail/staff-detail.component';
import { HomeComponent } from '../shared/components/home/home.component';
import { AdminGuard } from './guard/admin.guard';
import { PlayerDetailComponent } from './components/player-detail/player-detail.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { TeamDetailComponent } from './components/team-detail/team-detail.component';
import { TeamListComponent } from './components/team-list/team-list.component';
import { PlayerTeamComponent } from './components/player-team/player-team.component';
import { StaffTeamComponent } from './components/staff-team/staff-team.component';



const routes: Routes = [
  //staff
  {
    path: 'staff',
    component: StaffListComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'staff-detail',
    component: StaffDetailComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'staff-detail/:id',
    component: StaffDetailComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'staff-teams-detail/:id',
    component: StaffTeamComponent,
    canActivate: [AdminGuard],
  },
  //temas
  {
    path: 'teams',
    component: TeamListComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'teams-detail',
    component: TeamDetailComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'teams-detail/:id',
    component: TeamDetailComponent,
    canActivate: [AdminGuard],
  },
  //players
  {
    path: 'players',
    component: PlayerListComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'players-detail',
    component: PlayerDetailComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'players-detail/:id',
    component: PlayerDetailComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'players-teams-detail/:id',
    component: PlayerTeamComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'unauthorized',
    component: HomeComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
