import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: './components/layout/layout.module#LayoutModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './components/login/login.module#LoginModule' },
  //{ path: 'signup', loadChildren: 'app/components/signup/signup.module#SignupModule' },
  //{ path: 'error', loadChildren: 'app/components/server-error/server-error.module#ServerErrorModule' },
  //{ path: 'access-denied', loadChildren: 'app/components/access-denied/access-denied.module#AccessDeniedModule' },
  //{ path: 'not-found', loadChildren: 'app/components/not-found/not-found.module#NotFoundModule' },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

