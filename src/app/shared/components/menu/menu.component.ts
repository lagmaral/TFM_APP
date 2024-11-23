import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { changeAppLanguage } from 'src/app/users/actions';
import { selectCurrentLanguage } from 'src/app/users/selectors/user.selector';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit{
  isLoggedIn = false; // Estado de sesión
  adminExpanded = false; // Estado de expansión del submenú de administración
  temporadaExpanded = false; // Estado de expansión del submenú de temporada
  clubExpanded = false; // Estado de expansión del submenú de cluib
  // Información del usuario logado
  userProfileImage = 'assets/img/default-avatar.png';
  userBackgroundImage = 'assets/img/default-background.jpg';
  userName = 'Nombre de Usuario';
  currentLanguage$ = this.store.select(selectCurrentLanguage);


  constructor(private translate: TranslateService,
    private store: Store,
    /*private authService: AuthService*/) {
    this.translate.setDefaultLang('es');
    this.store.select(selectCurrentLanguage).subscribe((language) => {
      this.translate.use(language);
    });
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

  onLanguageChange(event: any ) {
    const selectedLanguage = event;
    this.store.dispatch(changeAppLanguage({ locale: selectedLanguage }));
    this.translate.use(selectedLanguage);
  }
}
