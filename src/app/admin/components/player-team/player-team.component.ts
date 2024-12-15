import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { EquipoDTO } from '../../models/equipo.dto';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import * as AdminActions from '../../actions';
import { Router } from '@angular/router';
import { JugadorDTO } from '../../models/jugador.dto';
import { PlantillaDTO } from '../../models/plantilla.dto';
import { PaginatedFilter } from '../../reducers';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-player-team',
  templateUrl: './player-team.component.html',
  styleUrls: ['./player-team.component.scss'],
})
export class PlayerTeamComponent  implements OnInit {

  detailForm: FormGroup;
  dorsal = new FormControl('',[Validators.required, this.isNumericValidator]);
  equipo = new FormControl('0',[ this.comboRequiredValidator]);
  equipos: EquipoDTO[] = [];
  jugador: JugadorDTO;
  plantillas: PlantillaDTO[] = [];
  plantilla: PlantillaDTO;
  paginated!: PaginatedFilter;
  displayedColumns: string[] = ['nombre','eliminar'];
  dataSource!: MatTableDataSource<PlantillaDTO>;
  constructor( private fb: FormBuilder,
        private store: Store<AppState>,
        private router: Router,
  ) {
    this.detailForm = this.fb.group(
      {
        dorsal: this.dorsal,
        equipo: this.equipo,
      }

    );
  }

  ngOnInit() {
      this.store.dispatch(AdminActions.searchTeamCatalog());

  }

  ngAfterViewInit(): void {
      this.store.select('admin').subscribe((admin) => {
        const filteredCatalogTeams = admin.catalogTeams.filter(catalogTeam =>
          !admin.loadedPlayer.plantillaList.some(plantilla => plantilla.idequipo === catalogTeam.id)
        );

        this.equipos = filteredCatalogTeams;//admin.catalogTeams;
        this.jugador = admin.loadedPlayer;
        this.paginated = admin.filters;
        this.plantillas  = admin.loadedPlayer.plantillaList;
        this.dataSource = new MatTableDataSource(admin.loadedPlayer.plantillaList);
      });
  }
  onDelete(element: any) {
    this.store.dispatch(AdminActions.deletePlayerTeam({ id: Number(element), paginated: this.paginated }));
  }

  onSubmit(): void {
    if (this.detailForm.valid) {
      this.plantilla = new PlantillaDTO();
      this.plantilla.idjugador = this.jugador.id;
      this.plantilla.idequipo = this.detailForm.get('equipo')?.value;
      this.plantilla.dorsal = this.dorsal.value || '';
      this.store.dispatch(AdminActions.saveNewPlayerTeam({ item: this.plantilla, paginated: this.paginated }));


    } else {
      // Marcar los controles como tocados para mostrar errores
      this.detailForm.markAllAsTouched();
      console.log('Formulario incorrecto');
    }
  }

  onCancel(): void{
    this.store.dispatch(AdminActions.cleanDetail());
    this.router.navigate(['/admin/players']);
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
