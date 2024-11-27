import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StaffDTO } from '../../models/staff.dto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StaffDetailComponent  implements OnInit {

  @Input() staffData?: StaffDTO; // Input for existing staff data
  detailForm: FormGroup;
  isEditMode = false;
  telefono = new FormControl('', [Validators.required, Validators.pattern(/^\d{9}$/)]);
  fechanacimiento = new FormControl('', [ Validators.required,this.dateFormatValidator, this.minimumAgeValidator(new Date(new Date().getFullYear() - 5, 0, 1))]);
  nombre = new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(100)]);
  apellido1 = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]);
  apellido2 = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]);
  isAdmin = new FormControl(false, [Validators.required]);

  selectedImage: string | ArrayBuffer | null = null;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Inicializa el FormGroup
    this.detailForm = this.fb.group({
      nombre: this.nombre,
      fechanacimiento: this.fechanacimiento,
      apellido1: this.apellido1,
      apellido2: this.apellido2,
      telefono: this.telefono,
      isAdmin: [this.isAdmin]
    });
  }

  onFileSelected(event: FileList) {
    const file = event[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnInit(): void {
    // Comprobar si estamos en modo de edición (por ejemplo, si se pasa un ID en la URL)
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadStaffDetails(id);
    }
  }

  // Carga detalles del staff en el formulario para editar (simulado)
  loadStaffDetails(id: string): void {
    // Aquí iría una llamada al servicio para obtener los datos del empleado por su ID.
    // Simulación de datos cargados:
    const mockData = {
      telefono: '123456789',
      nombre: 'Juan',
      apellido1: 'Pérez',
      apellido2: 'García',
      fechanacimiento: new Date('1990-01-01'),
      isAdmin: true
    };
    this.detailForm.patchValue(mockData);
  }
  onCancel(): void {
    this.router.navigate(['/admin/staff']);
  }
  // Manejo del formulario al enviarlo
  onSubmit(): void {
    if (this.detailForm.valid) {
      const staffData = this.detailForm.value;
      if (this.isEditMode) {
        // Lógica para actualizar empleado
        console.log('Actualizar empleado:', staffData);
      } else {
        // Lógica para agregar nuevo empleado
        console.log('Agregar nuevo empleado:', staffData);
      }
      // Navegar a otra página o mostrar una notificación
      this.router.navigate(['/admin/staff']);
    } else {
      // Marcar los controles como tocados para mostrar errores
      this.detailForm.markAllAsTouched();
    }
  }

  dateFormatValidator(control: FormControl): { [key: string]: any } | null {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/; // Formato DD/MM/YYYY
    if (control.value && !regex.test(control.value)) {
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
    if (control.hasError('pattern') && field === 'TELEFONO') {
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
