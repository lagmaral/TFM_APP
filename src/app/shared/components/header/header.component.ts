import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { Subscription } from 'rxjs';
import { AuthModalComponent } from 'src/app/auth/components/auth-modal/auth-modal.component';
import { LoginComponent } from 'src/app/auth/components/login/login.component';
import { ScreenSizeService } from 'src/app/shared/services/screen-size.service';
import { changeAppLanguage } from 'src/app/users/actions/user.action';
import { selectCurrentLanguage } from 'src/app/users/selectors/user.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLargeScreen = false;
  isLoggedIn = false; // Estado de sesión
  adminExpanded = false; // Estado de expansión del submenú de administración
  clubExpanded = false; // Estado de expansión del submenú de cluib
  selectedSeason!: string;
  //selectedLanguage: string = 'es'; // Idioma por defecto
  private subscription!: Subscription;
  currentLanguage$ = this.store.select(selectCurrentLanguage);

  constructor(private screenSizeService: ScreenSizeService,
    private store: Store,
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
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  goToProfile(): void {
    console.log('Redirigir al perfil del usuario');
  }

  onSeasonChange(event: any) {
    console.log('Temporada seleccionada:', this.selectedSeason);
  }

  onLanguageChange(event: Event): void {
    const selectedLanguage = (event.target as HTMLSelectElement).value;
    this.store.dispatch(changeAppLanguage({ locale: selectedLanguage }));
    this.translate.use(selectedLanguage);
  }

  async openLoginModal() {
    const modal = await this.modalController.create({
      component: AuthModalComponent,
      //cssClass: 'custom-modal', // Puedes agregar clases CSS personalizadas si es necesario
    });
    return await modal.present();
  }
}
