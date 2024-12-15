import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { EquipoDTO } from '../../models/equipo.dto';

import { PaginatedFilter } from '../../reducers';
import * as AdminActions from '../../actions';
import { AppState } from 'src/app/app.reducers';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CargoDTO } from '../../models/cargo.dto';
import { StaffDTO } from '../../models/staff.dto';
import { EquipoStaffDTO } from '../../models/equipo-staff.dto';

@Component({
  selector: 'app-staff-team',
  templateUrl: './staff-team.component.html',
  styleUrls: ['./staff-team.component.scss'],
})
export class StaffTeamComponent  implements OnInit {

  detailForm: FormGroup;
  //dorsal = new FormControl('',[Validators.required, this.isNumericValidator]);
  equipo = new FormControl('0',[ this.comboRequiredValidator]);
  cargo = new FormControl('0',[ this.comboRequiredValidator]);
  equipos: EquipoDTO[] = [];
  cargos: CargoDTO[] = [];
  staff: StaffDTO;
  plantillas: EquipoStaffDTO[] = [];
  equipoStaff: EquipoStaffDTO;
  paginated!: PaginatedFilter;

  constructor( private fb: FormBuilder,
        private store: Store<AppState>,
        private router: Router,
  ) {
    this.detailForm = this.fb.group(
      {
        cargo: this.cargo,
        equipo: this.equipo,
      }

    );
  }

  ngOnInit() {
      this.store.dispatch(AdminActions.searchTeamCatalog());
      this.store.dispatch(AdminActions.searchCargoCatalog());

  }

  ngAfterViewInit(): void {
      this.store.select('admin').subscribe((admin) => {
        const filteredCatalogTeams = admin.catalogTeams.filter(catalogTeam =>
          !admin.loadedStaff.equiposList.some(equipo => equipo.idequipo === catalogTeam.id)
        );

        this.equipos = filteredCatalogTeams;
        this.cargos = admin.catalogCargos;

        this.staff = admin.loadedStaff;
        this.paginated = admin.filters;
        this.plantillas  = admin.loadedStaff.equiposList;

      });
  }
  onDelete(element: any) {
    this.store.dispatch(AdminActions.deleteStaffTeam({ id: Number(element), paginated: this.paginated }));
  }

  onSubmit(): void {
    if (this.detailForm.valid) {
      this.equipoStaff = new EquipoStaffDTO();
      this.equipoStaff.idstaff = this.staff.id;
      this.equipoStaff.idequipo = this.detailForm.get('equipo')?.value;
      this.equipoStaff.idcargo = this.detailForm.get('cargo')?.value;
      this.store.dispatch(AdminActions.saveNewStaffTeam({ item: this.equipoStaff, paginated: this.paginated }));


    } else {
      // Marcar los controles como tocados para mostrar errores
      this.detailForm.markAllAsTouched();
      console.log('Formulario incorrecto');
    }
  }

  onCancel(): void{
    this.store.dispatch(AdminActions.cleanDetail());
    this.router.navigate(['/admin/staff']);
  }
  isNumericValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (isNaN(value)) {
        return { 'isNumeric': true };
      }
      return null;
    };
  }

    comboRequiredValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          const value = control.value;
          // Si el valor es 0 o está vacío, retorna un error de validación
          if (value === 0 || value === null || value === '') {
            return { 'comboRequired': true }; // Error de validación
          }
          return null; // Sin errores
        };
      }

      getErrorMessage(control: AbstractControl, field: string): string {
        if (control.hasError('required')) {
          return `ERRORS.${field}.REQUIRED`;
        }
        if (control.hasError('minlength')) {
          return `ERRORS.${field}.MIN_LENGTH`;
        }
        if (control.hasError('maxlength')) {
          return `ERRORS.${field}.MAX_LENGTH`;
        }
        if (control.hasError('pattern') && field === 'TELEFONO') {
          return `ERRORS.PHONE.INVALID`;
        }
        if (control.hasError('minimumAge')) {
          return `ERRORS.BIRTHDATE.MIN_AGE`;
        }
        if (control.hasError('invalidDateFormat')) {
          return `ERRORS.BIRTHDATE.INVALID_FORMAT`;
        }
        if (control.hasError('comboRequired')) { // Para los combos obligatorios
          return `ERRORS.${field}.COMBO_REQUIRED`; // Mensaje específico para combos
        }
        if (control.hasError('isNumeric')) { // Para los combos obligatorios
          return `ERRORS.${field}.NUMERIC`; // Mensaje específico para combos
        }
        return '';
      }
}
