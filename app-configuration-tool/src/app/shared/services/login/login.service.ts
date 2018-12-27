import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from "rxjs/internal/operators";
import { HelperService } from '../helper.service';
import { LoginDetails } from '../../../interfaces/login/login.request';
// import { LoginResponse } from 'app/interfaces/login/login.response';

@Injectable()
export class LoginService {

  hostUrl: string = 'https://ui.platform.aero:3443/'//DEV SERVER HTTPS
  //hostUrl:string ='http://13.90.100.176:8080/'//DEV SERVER HTTP
  //hostUrl: string = 'http://localhost:8080/';
  private userLogInUrl = this.hostUrl + 'users/login';
  private userLogOutUrl = this.hostUrl + 'users/logout';
  private userUrl = this.hostUrl + 'users/';

  token: string;
  logInName: string;
  isLoggedInBool: boolean = false;
  email: string;
  userIdForEdit: string;
  isAdmin: boolean;
  icon: string;
  options: any;
  helperService: HelperService;

  constructor(
    private http: HttpClient
  ) {
    // Set token if there is one saved in local storage.
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.logInName = currentUser && currentUser.logInName;
    this.email = currentUser && currentUser.email;

    // Manoj Commented - Will re add once actual Service end point has been recieved.
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Http options and To display the full response & as 'body' for type cast
    this.options = {
      headers: headers,
      observe: "response" as 'body'
    };
  }

  login(email: string, password: string): Observable<boolean> {

    const body = { "email": email.toLowerCase(), "password": password };

    return this.http.post<LoginDetails>(this.userLogInUrl, body, this.options).pipe(
      map((response: HttpResponse<any>) => {
        const token = response.headers.get('x-auth');
        this.userIdForEdit = response.body._id;
        this.logInName = response.body.forename + " " + response.body.surname;
        this.email = response.body.email;
        this.isAdmin = response.body.admin;
        this.icon = response.body.icon;

        if (token) {
          this.token = token;
          // Stores email and JWT in local storage to keep the user logged in between page refreshes.
          localStorage.setItem('currentUser', JSON.stringify
            ({
              "userId": this.userIdForEdit,
              "email": email,
              "token": token,
              "logInName": this.logInName,
              "isAdmin": this.isAdmin,
              "icon": this.icon
            })
          );
          this.isLoggedInBool = true
          // Return true to indicate a successful log in occured.
          return true;
        }
        else {
          // Return false to indictate a failed log in attempt.
          this.isLoggedInBool = false;
          return false;
        }
      })
    );
  }

  // Http call to add a new user to the database.
  addNewUser(email: string, forename: string, surname: string, password: string, base64String: string): Observable<any> {
    const body = { "email": email.toLowerCase(), "forename": forename, "surname": surname, "password": password, "icon": base64String };
    return this.http.post<any>(this.userUrl, body, this.options).pipe(
      map((response: HttpResponse<any>) => {
        return response.body;
      }));
  }

  validateEmail(email: string) {
    const body = { "email": email.toLowerCase(), "password": 'xxxx' };
    return this.http.post<LoginDetails>(this.userLogInUrl, body, this.options).pipe(
      map((response: HttpResponse<any>) => {
        return response.body;
      }));
  }

  logout(): Observable<any> {
    // Clear the token and remove the user data from local storage to log user out.
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth': this.token
      })
    }
    return this.http.delete(this.userLogOutUrl, httpOptions).pipe(
      map((response: HttpResponse<any>) => {
        this.token = null;
        localStorage.removeItem('currentUser');
        this.isLoggedInBool = false;
        this.isAdmin = false;
        return true;
      }),
      catchError(this.helperService.handleHttpError)
    );
  }
}
