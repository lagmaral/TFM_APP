import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment.prod';
import { appReducers, EffectsArray } from './app.reducers';
import { NoopAnimationsModule  } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/components/header/header.component';
import { HomeComponent } from './shared/components/home/home.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { AuthModule } from './auth/auth.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AdminModule } from './admin/admin.module';
import * as AdminReducer from './admin/reducers/admin.reducer';
import * as AuthReducer from './auth/reducers/auth.reducer';
import * as TeamReducer from './equipos/reducers/equipos.reducer';
import * as PartidosReducer from './partidos/reducers/partidos.reducer';
import { EquiposModule } from './equipos/equipos.module';
import { NoticiasModule } from './noticias/noticias.module';
import { PatrocinadoresModule } from './patrocinadores/patrocinadores.module';
import { ResultadosModule } from './resultados/resultados.module';
import { PartidosModule } from './partidos/partidos.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es'; // Para español
import localeEu from '@angular/common/locales/eu'; // Para euskera

registerLocaleData(localeEs, 'es'); // Registra español
registerLocaleData(localeEu, 'eu'); // Registra euskera

@NgModule({
  declarations: [AppComponent,HeaderComponent, MenuComponent,HomeComponent],
  imports: [ IonicModule.forRoot(), AppRoutingModule,
    SharedModule,
    StoreModule.forRoot({
      admin: AdminReducer.adminReducer,
      auth: AuthReducer.authReducer,
      team: TeamReducer.teamReducer,
      partido: PartidosReducer.partidoReducer
    }),
    /*StoreModule.forRoot(appReducers, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    }),*/
    EffectsModule.forRoot(EffectsArray),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    NoopAnimationsModule ,
    AuthModule,
    FormsModule,
    AdminModule,
    EquiposModule,
    NoticiasModule,
    PatrocinadoresModule,
    ResultadosModule,
    PartidosModule,
    FontAwesomeModule
   ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    //provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirebaseApp(() => initializeApp({"projectId":"pauldarrak-auth","appId":"1:1084284680659:web:02183450b0512d67131726","storageBucket":"pauldarrak-auth.firebasestorage.app","apiKey":"AIzaSyAMinpFLG84LNB2anePYgZTxe9EmEOHTOI","authDomain":"pauldarrak-auth.firebaseapp.com","messagingSenderId":"1084284680659","measurementId":"G-4BH6YRR4XD"})),
    provideAuth(() => getAuth())],
  bootstrap: [AppComponent],
  exports: [SharedModule]
})
export class AppModule {}
