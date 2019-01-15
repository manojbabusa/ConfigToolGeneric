import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,  HttpErrorResponse
} from '@angular/common/http';

import { Observable, EMPTY,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { RestApiService } from './helper.httpServices';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  
  constructor(private restApiService: RestApiService, private auth: MsAdalAngular6Service, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.setAuthorizationHeader(request)).pipe(
      catchError((event) => {
        console.log('event', event);
        if (event instanceof HttpErrorResponse) {
          return this.catch401(event);
        }
      }));
  }



  // Request Interceptor to append Authorization Header
  private setAuthorizationHeader(req: HttpRequest<any>): HttpRequest<any> {
    // Make a clone of the request then append the Authorization Header
    // Other way of writing :
    // return req.clone({headers: req.headers.set('Authorization', this.authService.token )});
   
    return req.clone({ setHeaders: { Authorization: this.auth.accessToken } });
  }
  // Response Interceptor
  private catch401(error: HttpErrorResponse): Observable<any> {
    // Check if we had 401 response
    if (error.status === 401) {
      // redirect to Login page for example
      this.router.navigateByUrl('/login');
      return EMPTY;
    }
    return Observable.throw(error);
  }

 
}
