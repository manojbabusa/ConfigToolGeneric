import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
 
@Injectable()
export class ADAuthenticationGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private adalSvc: MsAdalAngular6Service 
  ) { }
 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.adalSvc.isAuthenticated) {
      return true;
      //const returnUrl = route.queryParams['returnUrl'] || '/';
      //this.router.navigate([returnUrl]);
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
 
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }
}
