import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../shared/animations/router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { LoginService } from '../../../shared/services/login/login.service';
import { AlertService } from '../../../shared/services/alert.service';
import * as CONST from '../../../shared/constants/constants';

@Component({
    templateUrl: './authenticate-user.component.html',
    styleUrls: ['./authenticate-user.component.scss'],
    animations: [routerTransition()]
})
export class AuthenticateUserComponent implements OnInit {

    /*Display logged in user variables*/
    logInName: string;
    loggedInEmail: string;
    isAdmin: boolean;

    /*Theme Variables*/
    userId: string;
    icon: string;

    /*Booleans*/
    isUserLoggedInBool: boolean = false;

    loginForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        public router: Router,
        private formBuilder: FormBuilder,
        private loginService: LoginService,
        private alertService: AlertService
    ) { }

    ngOnInit() { 
        
        const emailPattern = new RegExp('^[a-z0-9](\.?[a-z0-9]){4,}@sita\.aero$', 'i');
        
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern(CONST.EMAIL_REGEX)]],
            password: ['', [Validators.required, Validators.minLength(CONST.EMAIL_MIN_LENGTH)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.loginService.login(this.f.email.value, this.f.password.value).pipe()
        .subscribe(
            (data: boolean) => {
                this.router.navigate(['']);
            },
            error => {
                this.alertService.error('Email or Password is incorrect');
                this.loading = false;
            },
            () => {
                this.userId = this.loginService.userIdForEdit;
                this.logInName = this.loginService.logInName;
                this.loggedInEmail = this.loginService.email;
                this.isAdmin = this.loginService.isAdmin;
                this.isUserLoggedInBool = true;
                this.icon = this.loginService.icon;
            });
    }

}
