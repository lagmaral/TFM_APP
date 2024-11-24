import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { selectCurrentLanguage } from 'src/app/users/selectors/user.selector';
import { UsuarioDTO } from '../../models/usuario.dto';
import * as AuthAction from '../../actions';
import { ModalControlService } from '../../services/modal.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Output() switchToLogin = new EventEmitter<void>(); // Para notificar el cambio
  datetime: Date = new Date();
  name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]);
  alias = new FormControl('', [Validators.required, Validators.maxLength(100)]);
  birthdate = new FormControl('', [ Validators.required,this.dateFormatValidator, this.minimumAgeValidator(new Date(new Date().getFullYear() - 5, 0, 1))]);
  lastname1 = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]);
  lastname2 = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]);
  phone = new FormControl('', [Validators.required, Validators.pattern(/^\d{9}$/)]);
  email = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]);
  password = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(200)]);
  confirmPassword = new FormControl('', [Validators.required]);
  form: FormGroup;

  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private translate: TranslateService,
    private modalControlService: ModalControlService
  ) {
    this.translate.setDefaultLang('es');
    this.form = this.fb.group(
      {
        name: this.name,
        alias: this.alias,
        birthdate: this.birthdate,
        lastname1: this.lastname1,
        lastname2: this.lastname2,
        phone: this.phone,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      },
      {
        validators: this.passwordMatchValidator
      }
    );
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

  passwordMatchValidator(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  ngOnInit(): void {
    this.store.select(selectCurrentLanguage).subscribe((language) => {
      this.translate.use(language);
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if (this.form.valid) {
      const user =  new UsuarioDTO();
      user.telefono= this.form.get('phone')?.value,
      user.email = this.form.get('email')?.value,
      user.username = this.form.get('alias')?.value,
      user.password = this.form.get('password')?.value,
      user.nombre = this.form.get('name')?.value,
      user.apellido1 = this.form.get('lastname1')?.value,
      user.apellido2 = this.form.get('lastname2')?.value,
      user.fechanacimiento = this.form.get('birthdate')?.value,
      this.store.dispatch(AuthAction.register({ user }));
    }
  }

  onSwitchToLogin() {
    this.switchToLogin.emit();
  }

  getErrorMessage(control: AbstractControl, field: string): string {
    if (control.hasError('required')) {
      return `REGISTER.ERRORS.${field}.REQUIRED`;
    }
    if (control.hasError('minlength')) {
      return `REGISTER.ERRORS.${field}.MIN_LENGTH`;
    }
    if (control.hasError('maxlength')) {
      return `REGISTER.ERRORS.${field}.MAX_LENGTH`;
    }
    if (control.hasError('email')) {
      return `REGISTER.ERRORS.EMAIL.INVALID`;
    }
    if (control.hasError('pattern') && field === 'PHONE') {
      return `REGISTER.ERRORS.PHONE.INVALID`;
    }
    if (control.hasError('minimumAge')) {
      return `REGISTER.ERRORS.BIRTHDATE.MIN_AGE`;
    }
    if (control.hasError('invalidDateFormat')) {
      return `REGISTER.ERRORS.BIRTHDATE.INVALID_FORMAT`;
    }
    if (this.form.hasError('passwordsMismatch') && field === 'CONFIRM_PASSWORD') {
      return `REGISTER.ERRORS.CONFIRM_PASSWORD.MISMATCH`;
    }
    return '';
  }
}
