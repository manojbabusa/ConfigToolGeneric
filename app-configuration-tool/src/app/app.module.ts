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
import { ADAuthenticationGuard } from './shared/guard/AD-authenication-guard';
import { environment } from '../environments/environment';

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
      tenant: environment.adalConfig.tenant,    
      clientId: environment.adalConfig.clientId,
      redirectUri: environment.adalConfig.redirectUri ,
      cacheLocation: environment.adalConfig.cacheLocation,
    }),
    AppRoutingModule
  ],
  providers: [AuthGuard,HelperService,ADAuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
