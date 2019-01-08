import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../shared/animations/router.animations';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

@Component({
  templateUrl: './authenticate-user.component.html',
  styleUrls: ['./authenticate-user.component.scss'],
  animations: [routerTransition()]
})
export class AuthenticateUserComponent {

  loading = false;
  public loaderMessage: string = "Redirecting...";
  constructor(
    private adalService: MsAdalAngular6Service
  ) { }


  onSubmit() {
    this.loading = true;
    this.adalService.handleCallback();
    // Check if the user is authenticated. If not, call the login() method
    if (!this.adalService.isAuthenticated) {
      this.adalService.login();
    }
    else {
      this.loading = false;
    }

  }

}
