import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StaffDTO } from '../../models/staff.dto';
import { ActivatedRoute, Router } from '@angular/router';
import * as AdminActions from '../../actions';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { PaginatedFilter } from '../../reducers';


@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class StaffDetailComponent  implements OnInit {

  //@Input() inputDTO?: StaffDTO;
  detailForm: FormGroup;
  isEditMode = false;
  staffMember!: StaffDTO;
  telefono = new FormControl('', [Validators.required,   Validators.pattern(/^[67]\d{8}$/)]);
  fechanacimiento = new FormControl('', [ Validators.required,/*this.dateFormatValidator,*/ this.minimumAgeValidator(new Date(new Date().getFullYear() - 5, 0, 1))]);
  nombre = new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(100)]);
  apellido1 = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]);
  apellido2 = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]);
  isAdmin = new FormControl(false);
  paginated!: PaginatedFilter;
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
      fechanacimiento: this.fechanacimiento,
      apellido1: this.apellido1,
      apellido2: this.apellido2,
      telefono: this.telefono,
      isAdmin: this.isAdmin
    });
  }

  onFileSelected(event: FileList) {
      if (event.length > 0) {
        this.selectedImage = event.item(0); // Obtiene el primer archivo seleccionado
      }
    }

  ngOnInit(): void {

    this.store.select('admin').subscribe((admin) => {
      this.staffMember = admin.loadedStaff;
      this.paginated = admin.filters;

      this.detailForm.get('telefono')?.setValue(admin.loadedStaff.telefono);
      this.detailForm.get('isAdmin')?.setValue(admin.loadedStaff.admin);
      const fechaNacimiento = new Date(admin.loadedStaff.fechanacimiento);
      this.detailForm.get('fechanacimiento')?.setValue(fechaNacimiento);
      this.detailForm.get('nombre')?.setValue(admin.loadedStaff.nombre);
      this.detailForm.get('apellido1')?.setValue(admin.loadedStaff.apellido1);
      this.detailForm.get('apellido2')?.setValue(admin.loadedStaff.apellido2);
      if(admin.loadedStaff.internalkey){
        this.isEditMode = true;
      }else{
        this.isEditMode = false;
      }

    });

    /*const idParam = this.route.snapshot.paramMap.get('id');
    //this.staffId = idParam ? Number(idParam) : 0; // Asigna 0 si no se encuentra
    if (idParam) {
      this.isEditMode = true;
      this.store.dispatch(AdminActions.getStaffById({ id: Number(idParam) }));
    }*/
  }



  onCancel(): void {
    this.store.dispatch(AdminActions.cleanDetail());
    this.router.navigate(['/admin/staff']);
  }
  // Manejo del formulario al enviarlo
  onSubmit(): void {


    if (this.detailForm.valid) {
      const item = new FormData();
      item.append('id', this.staffMember.id.toString());
      item.append('telefono', this.detailForm.get('telefono')?.value);
      item.append('admin', this.detailForm.get('isAdmin')?.value);
      item.append('fechanacimiento', this.detailForm.get('fechanacimiento')?.value);
      item.append('nombre', this.detailForm.get('nombre')?.value);
      item.append('apellido1', this.detailForm.get('apellido1')?.value,);
      item.append('apellido2', this.detailForm.get('apellido2')?.value,);
      if (this.selectedImage) {
        item.append('image', this.selectedImage);
      }
      if(this.isEditMode){
        this.store.dispatch(AdminActions.modifyStaff({id:this.staffMember.id, item , paginated: this.paginated }));
      }else{
        this.store.dispatch(AdminActions.saveNewStaff({ item, paginated: this.paginated }));
      }

    } else {
      // Marcar los controles como tocados para mostrar errores
      this.detailForm.markAllAsTouched();
    }
  }

  dateFormatValidator(control: FormControl): { [key: string]: any } | null {
      const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/; // Formato DD/MM/YYYY
      const dateString = control.value ? control.value.format('DD/MM/YYYY') : ''
      //const dateString = fechaNacimiento ? control.value.format('DD/MM/YYYY') : ''
      if (dateString && !regex.test(dateString)) {
        return { 'invalidDateFormat': true };
      }


    return null;
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
    if (control.hasError('pattern') && field === 'PHONE') {
      return `ERRORS.PHONE.INVALID`;
    }
    if (control.hasError('minimumAge')) {
      return `ERRORS.BIRTHDATE.MIN_AGE`;
    }
    if (control.hasError('invalidDateFormat')) {
      return `ERRORS.BIRTHDATE.INVALID_FORMAT`;
    }
    return '';
  }
}
