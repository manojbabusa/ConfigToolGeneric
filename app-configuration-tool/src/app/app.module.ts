import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { OpenCloseDirective } from '../app/shared/directives/open-close.directive';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './shared/guard/auth.guard';
import { HelperService } from './shared/services/helper.service';
import { MsAdalAngular6Module,AuthenticationGuard } from 'microsoft-adal-angular6';


// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
  declarations: [
    AppComponent,
    OpenCloseDirective
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    MsAdalAngular6Module.forRoot({
      tenant: '3b27d02e-0ad3-4e02-947d-dd47cf86624f',      
     // clientId: 'e5ad3d77-0d56-42dc-b542-0fd8371a2a93',
      clientId:'62374115-36a3-4cfa-a2ce-03ef0f2816be',
      redirectUri: window.location.origin,
      /*endpoints: {
        "https://localhost/Api/": "xxx-bae6-4760-b434-xxx"
      },*/
     //navigateToLoginRequestUrl: false,
      cacheLocation: 'localStorage',
    }),
    AppRoutingModule
  ],
  providers: [AuthGuard,HelperService,AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
