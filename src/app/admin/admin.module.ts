import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { StaffListComponent } from './components/staff-list/staff-list.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field'; // Para mat-form-field
import { MatInputModule } from '@angular/material/input'; // Para matInput (en los campos de entrada)
import { MatDatepickerModule } from '@angular/material/datepicker'; // Para mat-datepicker
import { MatNativeDateModule } from '@angular/material/core'; // Para fechas nativas con mat-datepicker
import { MatIconModule } from '@angular/material/icon'; // Para mat-icon
import { MatPaginatorModule } from '@angular/material/paginator'; // Para mat-paginator
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { StaffDetailComponent } from './components/staff-detail/staff-detail.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFileUploadModule } from 'mat-file-upload';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [StaffListComponent,StaffDetailComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MatFormFieldModule, // Agrega el módulo de mat-form-field
    MatInputModule, // Agrega el módulo de matInput
    MatDatepickerModule, // Agrega el módulo de mat-datepicker
    MatNativeDateModule, // Agrega el módulo para fechas nativas
    MatIconModule, // Agrega el módulo de mat-icon
    MatPaginatorModule, // Agrega el módulo de mat-paginator
    MatTableModule, // Importa MatTableModule aquí
    MatCardModule,
    MatSelectModule,
    MatSortModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatFileUploadModule,

  ],
  exports: [
    StaffListComponent,StaffDetailComponent
  ]
})
export class AdminModule { }
