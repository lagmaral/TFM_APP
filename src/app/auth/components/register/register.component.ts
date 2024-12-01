import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { UsuarioDTO } from '../../models/usuario.dto';
import * as AuthAction from '../../actions';
import { selectCurrentLanguage } from '../../selectors/auth.selector';
import { AppState } from 'src/app/app.reducers';
import { ModalController } from '@ionic/angular';


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
  isNewUser:boolean = true;
  modificationUser!:UsuarioDTO;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private translate: TranslateService,
    private modalController: ModalController
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

    const language = localStorage.getItem('p-prefer-language');
    if(language){
      this.translate.use(language);
    }
    this.store.select('auth').subscribe((auth) => {
      auth.credentials.id
      this.modificationUser = auth.credentials;
      this.form.get('name')?.setValue(auth.credentials.nombre);
      this.form.get('alias')?.setValue(auth.credentials.username);
      this.form.get('lastname1')?.setValue(auth.credentials.apellido1);
      this.form.get('lastname2')?.setValue(auth.credentials.apellido2);
      this.form.get('phone')?.setValue(auth.credentials.telefono);
      this.form.get('email')?.setValue(auth.credentials.email);
      this.form.get('birthdate')?.setValue(this.formatDateToDDMMYYYY(new Date(auth.credentials.fechanacimiento)));
      if(auth.credentials.username){
        this.isNewUser = false;
      }


    });

    if(this.isNewUser){
      this.form.get('birthdate')?.setValue('');
    }

  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  formatDateToDDMMYYYY(date:Date): string {

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Se suma 1 porque los meses son 0-indexados
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }


  onSubmit() {
    if (this.form.valid) {

      const user =  new UsuarioDTO();
      user.telefono= this.form.get('phone')?.value;
      user.email = this.form.get('email')?.value;
      user.username = this.form.get('alias')?.value;
      user.password = this.form.get('password')?.value;
      user.nombre = this.form.get('name')?.value;
      user.apellido1 = this.form.get('lastname1')?.value;
      user.apellido2 = this.form.get('lastname2')?.value;
      user.fechanacimiento = this.form.get('birthdate')?.value;
      if(this.isNewUser){
        this.store.dispatch(AuthAction.register({ user }));
      }else{
        user.token = this.modificationUser.token;
        this.store.dispatch(AuthAction.updateUser({ userId:this.modificationUser.token || '', user }));
      }

      //console.log(JSON.stringify(user));
    }
  }

  onSwitchToLogin() {
    this.switchToLogin.emit();
  }

  closeModal() {
    this.modalController.dismiss();
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
    if (control.hasError('email')) {
      return `ERRORS.EMAIL.INVALID`;
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
    if (this.form.hasError('passwordsMismatch') && field === 'CONFIRM_PASSWORD') {
      return `ERRORS.CONFIRM_PASSWORD.MISMATCH`;
    }
    return '';
  }
}


