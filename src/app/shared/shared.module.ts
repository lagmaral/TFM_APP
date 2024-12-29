import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HomePageRoutingModule } from './shared-routing.module';
import { IonicModule } from '@ionic/angular';
import { SpinnerComponent } from './components/spinner/spinner.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule,
    IonicModule, // Ensure IonicModule is imported here
    HomePageRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),HttpClientModule,
  ],
  exports: [TranslateModule, SpinnerComponent]
})
export class SharedModule { }
