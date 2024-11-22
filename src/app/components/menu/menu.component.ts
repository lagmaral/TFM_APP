import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  isLoggedIn = false; // Estado de sesión
  adminExpanded = false; // Estado de expansión del submenú de administración
  temporadaExpanded = false; // Estado de expansión del submenú de temporada
  clubExpanded = false; // Estado de expansión del submenú de cluib
  seasons = ['Temporada 1', 'Temporada 2', 'Temporada 3'];
  selectedSeason!: string;
  selectedLanguage: string = 'es'; // Idioma por defecto
  // Información del usuario logado
  userProfileImage = 'assets/img/default-avatar.png';
  userBackgroundImage = 'assets/img/default-background.jpg';
  userName = 'Nombre de Usuario';


  constructor(private translate: TranslateService/*private authService: AuthService*/) {
    this.translate.setDefaultLang('es');
    this.translate.use(this.selectedLanguage); // Establecer el idioma inicial
  }

  ngOnInit() {
    this.isLoggedIn = true;//this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      //const user = this.authService.getUserInfo();
      const user = {"name":"pedro", "avatar":"none", "background":"none"};//this.authService.getUserInfo();

      this.userName = user.name;
      this.userProfileImage = user.avatar;
      this.userBackgroundImage = user.background;
    }
  }

  toggleAdminOptions(event: Event): void {
    // Prevenir que el menú se cierre al hacer clic en el elemento de administración
    event.stopPropagation();
    this.adminExpanded = !this.adminExpanded;
  }

  toggleClubOptions(event: Event): void {
    // Prevenir que el menú se cierre al hacer clic en el elemento de club
    event.stopPropagation();
    this.clubExpanded = !this.clubExpanded;
  }

  toggleTemporadaOptions(event: Event): void {
    // Prevenir que el menú se cierre al hacer clic en el elemento de temporada
    event.stopPropagation();
    this.temporadaExpanded = !this.temporadaExpanded;
  }

  goToProfile(): void {
    console.log('Redirigir al perfil del usuario');
  }

  onSeasonChange(event: any) {
    console.log('Temporada seleccionada:', this.selectedSeason);
    // Lógica para manejar el cambio de temporada
  }

  onLanguageChange(event: any ) {
    this.translate.use(event.detail.value);  // Cambia el idioma utilizando ngx-translate
  }
}
