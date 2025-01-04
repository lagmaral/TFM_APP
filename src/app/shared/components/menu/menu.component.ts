import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { AppState } from 'src/app/app.reducers';
import { changeAppLanguage } from 'src/app/auth/actions';
import { RegisterComponent } from 'src/app/auth/components/register/register.component';
import { UsuarioDTO } from 'src/app/auth/models/usuario.dto';
import { selectCurrentLanguage } from 'src/app/auth/selectors/auth.selector';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit{
  iconURL = environment.apiUrl + '/pauldarrak/uploads/00.png';
  loggedUser!: UsuarioDTO;
  //isLoggedIn = false; // Estado de sesión
  adminExpanded = false; // Estado de expansión del submenú de administración
  temporadaExpanded = false; // Estado de expansión del submenú de temporada
  clubExpanded = false; // Estado de expansión del submenú de cluib
  userName = 'Nombre de Usuario';
  selectedLanguage = "es";//this.store.select(selectCurrentLanguage);


  constructor(private translate: TranslateService,
    private store: Store<AppState>,
    private modalController: ModalController) {
    this.translate.setDefaultLang('es');

  }

  ngOnInit() {
    this.store.select(selectCurrentLanguage).subscribe((language) => {
      this.translate.use(language);
      this.selectedLanguage = language || 'es';
    });

    this.store.select('auth').subscribe((auth) => {
      this.loggedUser = auth.credentials;
      this.userName = auth.credentials.username;
    });

    const language = localStorage.getItem('p-prefer-language');
    if(language){
      this.translate.use(language);
      this.selectedLanguage = language || 'es';
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

  async goToProfile() {
    const modal = await this.modalController.create({
      component: RegisterComponent,
    });
    return await modal.present();
  }

  onLanguageChange(event: any ) {
    const selectedLanguage = event;
    this.store.dispatch(changeAppLanguage({ locale: selectedLanguage }));
    this.translate.use(selectedLanguage);
    localStorage.setItem("p-prefer-language",selectedLanguage);
  }
}



