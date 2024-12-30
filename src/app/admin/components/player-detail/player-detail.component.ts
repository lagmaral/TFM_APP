import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as AdminActions from '../../actions';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { PaginatedFilter } from '../../reducers';
import { PosicionDTO } from '../../models/posicion.dto';
import { JugadorDTO } from '../../models/jugador.dto';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlayerDetailComponent  implements OnInit {

  detailForm: FormGroup;
  isEditMode = false;
  jugador: JugadorDTO = new JugadorDTO(0,0,0,'',new Date(),'',false,'','','','',[]);


  nombre = new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(100)]);
  apellido1 = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]);
  apellido2 = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]);
  fechanacimiento = new FormControl('', [ Validators.required,/*this.dateFormatValidator,*/ this.minimumAgeValidator(new Date(new Date().getFullYear() - 5, 0, 1))]);
  consentimiento = new FormControl(false,[ Validators.required]);
  posicion = new FormControl('0',[ this.comboRequiredValidator]);
  descripcion = new FormControl('');


  posiciones: PosicionDTO[] = [];

  @Input() paginated!: PaginatedFilter;
  //staffId!: number;
  selectedImage:  File | null = null;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) {
    // Inicializa el FormGroup
    this.detailForm = this.fb.group({
      nombre: this.nombre,
      apellido1: this.apellido1,
      apellido2: this.apellido2,
      fechanacimiento: this.fechanacimiento,
      consentimiento: this.consentimiento,
      posicion: this.posicion,
      descripcion: this.descripcion//['<p>Hola, mundo!</p>']

    });
  }

  onFileSelected(event: FileList) {
      if (event.length > 0) {
        this.selectedImage = event.item(0); // Obtiene el primer archivo seleccionado
      }
    }

  ngOnInit(): void {
      //cargar los catalogos
      this.store.dispatch(AdminActions.searchPosicionesCatalog());
      this.store.dispatch(AdminActions.searchTeamCatalog());
      this.store.select('admin').subscribe((admin) => {
        this.posiciones = admin.catalogPosiciones
        this.jugador = admin.loadedPlayer;
        //this.paginated = admin.filters;
        this.detailForm.get('nombre')?.setValue(admin.loadedPlayer.nombre);
        this.detailForm.get('apellido1')?.setValue(admin.loadedPlayer.apellido1);
        this.detailForm.get('apellido2')?.setValue(admin.loadedPlayer.apellido2);
        this.detailForm.get('descripcion')?.setValue(admin.loadedPlayer.descripcion);
        const fechaNacimiento = new Date(admin.loadedPlayer.fechanacimiento);
        this.detailForm.get('fechanacimiento')?.setValue(fechaNacimiento);
        this.detailForm.get('consentimiento')?.setValue(admin.loadedPlayer.consentimiento);
        this.detailForm.get('posicion')?.setValue(admin.loadedPlayer.idposicion);

        //this.jugador.

        if(admin.loadedPlayer.internalkey){
          this.isEditMode = true;
        }else{
          this.isEditMode = false;
        }
      });
  }



  onCancel(): void {
    this.store.dispatch(AdminActions.cleanDetail());
    this.router.navigate(['/admin/players']);
  }
  // Manejo del formulario al enviarlo
  onSubmit(): void {

    if (this.detailForm.valid) {
      const item = new FormData();

      if (this.jugador && this.jugador.id) {
        item.append('id', this.jugador.id.toString());
    } else {
        item.append('id', ''); // Asignar vacío si no hay id
    }
      item.append('nombre', this.detailForm.get('nombre')?.value);
      item.append('apellido1', this.detailForm.get('apellido1')?.value);
      item.append('apellido2', this.detailForm.get('apellido2')?.value);
      item.append('descripcion',this.detailForm.get('descripcion')?.value);
      item.append('consentimiento', this.detailForm.get('consentimiento')?.value);
      item.append('fechanacimiento', this.detailForm.get('fechanacimiento')?.value);
      item.append('idposicion', this.detailForm.get('posicion')?.value);
      if (this.selectedImage) {
        item.append('image', this.selectedImage);
      }

      if(this.isEditMode){
        this.store.dispatch(AdminActions.modifyPlayer({id:this.jugador.id, item , paginated: this.paginated }));
      }else{
        this.store.dispatch(AdminActions.saveNewPlayer({ item, paginated: this.paginated }));
      }

    } else {
      // Marcar los controles como tocados para mostrar errores
      this.detailForm.markAllAsTouched();
      console.log('Formulario incorrecto');
    }
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
    return '';
  }

  // Función de validación personalizada para la edad mínima de 5 años
  minimumAgeValidator(minDate: Date) {
    return (control: FormControl): { [key: string]: any } | null => {
      const inputDate = new Date(control.value);
      if (inputDate > minDate) {
        return { 'minimumAge': true }; // Si la fecha ingresada es mayor que la fecha mínima
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

    onReady(editor: any) {
      console.log('Editor is ready', editor);
    }
  }
