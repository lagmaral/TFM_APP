import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as AuthAction from '../../../auth/actions';
import { Subscription, tap } from 'rxjs';
import { AppState } from 'src/app/app.reducers';
import { changeAppLanguage } from 'src/app/auth/actions';
import { AuthModalComponent } from 'src/app/auth/components/auth-modal/auth-modal.component';
import { UsuarioDTO } from 'src/app/auth/models/usuario.dto';
import { selectCurrentLanguage } from 'src/app/auth/selectors/auth.selector';

import { ScreenSizeService } from 'src/app/shared/services/screen-size.service';
import { RegisterComponent } from 'src/app/auth/components/register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLargeScreen = false;

  loggedUser!: UsuarioDTO;
  isAdminUser = false;
  adminExpanded = false; // Estado de expansión del submenú de administración
  clubExpanded = false; // Estado de expansión del submenú de cluib
  private subscription!: Subscription;
  currentLanguage$ = this.store.select(selectCurrentLanguage);

  constructor(private screenSizeService: ScreenSizeService,
    private store: Store<AppState>,
    private translate: TranslateService,
    private modalController: ModalController) {



    this.translate.setDefaultLang('es');
  }

  ngOnInit(): void {
    this.subscription = this.screenSizeService.isLargeScreen$.subscribe(
      (isLarge) => (this.isLargeScreen = isLarge)
    );
    this.store.select(selectCurrentLanguage).subscribe((language) => {
      this.translate.use(language);
    });
    this.store.select('auth').subscribe((auth) => {
      this.loggedUser = auth.credentials;
      this.isAdminUser = auth.credentials.isAdmin;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  goToProfile(): void {
    console.log('Redirigir al perfil del usuario');
  }


  onLanguageChange(event: Event): void {
    const selectedLanguage = (event.target as HTMLSelectElement).value;
    this.store.dispatch(changeAppLanguage({ locale: selectedLanguage }));
    this.translate.use(selectedLanguage);
  }

  async openLoginModal() {
    const modal = await this.modalController.create({
      component: AuthModalComponent,
    });
    return await modal.present();
  }

  async openUserDetailModal() {
    const modal = await this.modalController.create({
      component: RegisterComponent,
      /*componentProps: {
        user: this.loggedUser // Pasamos el usuario logueado como parámetro
      },*/
    });
    return await modal.present();
  }

  async doLogout() {
    // Despacha la acción de logout con el token del usuario
    if (this.loggedUser.token) {
      this.store.dispatch(AuthAction.logout({ token: this.loggedUser.token }));
    }
  }
}
