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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/components/header/header.component';
import { HomeComponent } from './shared/components/home/home.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { AuthModule } from './auth/auth.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AdminModule } from './admin/admin.module';
import * as AdminReducer from './admin/reducers/admin.reducer';
import * as AuthReducer from './auth/reducers/auth.reducer';
import { EquiposModule } from './equipos/equipos.module';
import { NoticiasModule } from './noticias/noticias.module';
import { PatrocinadoresModule } from './patrocinadores/patrocinadores.module';
import { ResultadosModule } from './resultados/resultados.module';
import { FooterComponent } from './shared/components/footer/footer.component';

@NgModule({
  declarations: [AppComponent,HeaderComponent, MenuComponent,HomeComponent, FooterComponent],
  imports: [ IonicModule.forRoot(), AppRoutingModule,
    SharedModule,
    StoreModule.forRoot({
      admin: AdminReducer.adminReducer,
      auth: AuthReducer.authReducer
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
    BrowserAnimationsModule,
    AuthModule,
    FormsModule,
    AdminModule,
    EquiposModule,
    NoticiasModule,
    PatrocinadoresModule,
    ResultadosModule,
   ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    //provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirebaseApp(() => initializeApp({"projectId":"pauldarrak-auth","appId":"1:1084284680659:web:02183450b0512d67131726","storageBucket":"pauldarrak-auth.firebasestorage.app","apiKey":"AIzaSyAMinpFLG84LNB2anePYgZTxe9EmEOHTOI","authDomain":"pauldarrak-auth.firebaseapp.com","messagingSenderId":"1084284680659","measurementId":"G-4BH6YRR4XD"})),
    provideAuth(() => getAuth())],
  bootstrap: [AppComponent],
  exports: [SharedModule]
})
export class AppModule {}
