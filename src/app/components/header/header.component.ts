import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { Subscription } from 'rxjs';
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
  temporadaExpanded = false; // Estado de expansión del submenú de temporada
  clubExpanded = false; // Estado de expansión del submenú de cluib
  seasons = ['Temporada 1', 'Temporada 2', 'Temporada 3'];
  selectedSeason!: string;
  //selectedLanguage: string = 'es'; // Idioma por defecto
  private subscription!: Subscription;
  currentLanguage$ = this.store.select(selectCurrentLanguage);

  constructor(private screenSizeService: ScreenSizeService,
    private store: Store,
    private translate: TranslateService) {

    this.translate.setDefaultLang('es');
    this.store.select(selectCurrentLanguage).subscribe((language) => {
      this.translate.use(language);
    });
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
}
