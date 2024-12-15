import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private translate: TranslateService,
    private store: Store
  ) {
    this.initializeApp();
  }

  initializeApp() {
    /*const token = localStorage.getItem('p-token');
    if(token){
      this.store.dispatch(AuthAction.getUserByToken({ userId: token }));
    }
    console.log('QUE PASA CON IDIOMA??')
    const language = localStorage.getItem('p-prefer-language');
    console.log('RECOGIDO: '+language)
    if(language){
      this.store.dispatch(AuthAction.changeAppLanguage({ locale: language }));
    }*/


    this.translate.setDefaultLang('es');
    const language = localStorage.getItem('p-prefer-language');
    if(language){
      this.translate.use(language);
    }else{
      this.translate.use('es');
    }

  }
}
