import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { AuthModalComponent } from './components/auth-modal/auth-modal.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [LoginComponent,AuthModalComponent,RegisterComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ],
  exports:[
    AuthModalComponent, LoginComponent, RegisterComponent
  ]
})
export class AuthModule { }
