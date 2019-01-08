import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../shared/animations/router.animations';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router
  ) {
  }

    ngOnInit() { 
      const returnUrl = this.route.queryParams['returnUrl'] || '/';
      this.router.navigate([returnUrl]); 
    }


}
