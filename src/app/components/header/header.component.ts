import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core/lib/translate.service';
import { Subscription } from 'rxjs';
import { ScreenSizeService } from 'src/app/services/screen-size.service';

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
  selectedLanguage: string = 'es'; // Idioma por defecto
  private subscription!: Subscription;

  constructor(private screenSizeService: ScreenSizeService/*,private translate: TranslateService*/) {
    //this.translate.setDefaultLang('es');
    //this.translate.use(this.selectedLanguage); // Establecer el idioma inicial
  }

  ngOnInit(): void {
    this.subscription = this.screenSizeService.isLargeScreen$.subscribe(
      (isLarge) => (this.isLargeScreen = isLarge)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  goToProfile(): void {
    console.log('Redirigir al perfil del usuario');
  }

  onSeasonChange(event: any) {
    console.log('Temporada seleccionada:', this.selectedSeason);
    // Lógica para manejar el cambio de temporada
  }

  onLanguageChange(event: any ) {
    //this.translate.use(event.detail.value);  // Cambia el idioma utilizando ngx-translate
  }
}
