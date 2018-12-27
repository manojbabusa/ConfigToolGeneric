import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../shared/animations/router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../shared/services/login/login.service';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    animations: [routerTransition()]
})
export class ForgotPasswordComponent implements OnInit {
    
    forgotPasswordForm: FormGroup;
    submitted = false;
    loading = false;
    emailSuccess = false;

    constructor(
        private formBuilder: FormBuilder,
        private loginService: LoginService,
        private alertService: AlertService
    ) { }

    ngOnInit() { 

        const emailPattern = new RegExp('^[a-z0-9](\.?[a-z0-9]){4,}@sita\.aero$', 'i');
        
        this.forgotPasswordForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern(emailPattern)]],
        });

    }

    // Getter for easy access to form fields
    get f() { return this.forgotPasswordForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.forgotPasswordForm.invalid) {
            return;
        }

        this.loading = true;
        this.loginService.validateEmail(this.f.email.value)
        .pipe()
        .subscribe(
            data => {},
            error => {
                if (error.error === 'Incorrect Password') {
                    this.emailSuccess= true;
                } else {
                    const errorMessage = 'This email address is not registered with SITA UI';
                    this.alertService.error(errorMessage);
                }  
                this.loading = false;        
            }
        );

    }

}
