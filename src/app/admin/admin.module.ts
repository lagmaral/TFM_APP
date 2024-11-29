import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
//import { StaffListComponent } from './components/staff-list/staff-list.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter } from '@angular/material/core';
import { StaffListComponent } from './components/staff-list/staff-list.component';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [StaffListComponent,StaffDetailComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    FormsModule,
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
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }, // Ajusta esto a tu localización preferida
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ]
})
export class AdminModule { }
