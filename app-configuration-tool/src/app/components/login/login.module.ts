import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginService } from '../../shared/services/login/login.service';
import { AuthenticateUserComponent } from './authenticate-user/authenticate-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AlertService } from '../../shared/services/alert.service';
import { AlertComponent } from '../../shared/directives/alert.component';

@NgModule({
    imports: [
        CommonModule, 
        FormsModule,
        ReactiveFormsModule,
        LoginRoutingModule,
        FormsModule
    ],
    declarations: [
        LoginComponent,
        AuthenticateUserComponent,
        ForgotPasswordComponent,
        AlertComponent
    ],
    providers: [
        LoginService,
        AlertService
    ]
})
export class LoginModule {}
