import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthenticateUserComponent } from './authenticate-user/authenticate-user.component'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
    { 
        path: '', 
        component: LoginComponent, 
        children: [
            { path: '', component: AuthenticateUserComponent },
            { path: 'change-password', component: ForgotPasswordComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule {}
