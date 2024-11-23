import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as AuthAction from '../../actions';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { selectCurrentLanguage } from 'src/app/users/selectors/user.selector';
import { AuthDTO } from '../../models/auth.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output() switchToSignup = new EventEmitter<void>();
  form: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(200)]);
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('es');
    this.form = this.fb.group({
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit(): void {
    this.store.select(selectCurrentLanguage).subscribe((language) => {
      this.translate.use(language);
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  onSubmit(): void {
    const credentials: AuthDTO = {
      email: this.email.value!,
      password: this.password.value!,
      user_id: '',
      access_token: '',
    };

    this.store.dispatch(AuthAction.login({ credentials }));
  }

  /*onSubmit() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      /*this.authService
        .login(email, password)
        .then(() => this.router.navigate(['/']));
    }
  }*/

  onSwitchToSignup() {
    this.switchToSignup.emit();
  }

  getErrorMessage(field: string): string {
    const control = this.form.get(field);

    if (control?.hasError('required')) {
      return this.translate.instant(`LOGIN.ERRORS.${field.toUpperCase()}.REQUIRED`);
    }
    if (control?.hasError('email')) {
      return this.translate.instant(`LOGIN.ERRORS.${field.toUpperCase()}.INVALID`);
    }
    if (control?.hasError('minlength')) {
      return this.translate.instant(`LOGIN.ERRORS.${field.toUpperCase()}.MIN_LENGTH`);
    }
    if (control?.hasError('maxlength')) {
      return this.translate.instant(`LOGIN.ERRORS.${field.toUpperCase()}.MAX_LENGTH`);
    }
    if (control?.hasError('pattern')) {
      return this.translate.instant(`LOGIN.ERRORS.${field.toUpperCase()}.PATTERN`);
    }

    return '';
  }
}
