import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { catchError } from "rxjs/internal/operators";
import { HelperService } from '../helper.service';
import { Observable } from 'rxjs';

@Injectable()
export class ThemeService {
    hostUrl: string = 'http://13.90.100.176:8080/';
    private getThemeListUrl = this.hostUrl + 'theme/';
    private addThemeListUrl = this.hostUrl + 'theme';

    httpHeaders: Object;
    token: string;
    themeIdForEdit: string;

    constructor(
        private http: HttpClient,
        private helperService: HelperService
    ) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.httpHeaders = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'x-auth': this.token
            })
        };
    }
    
    /******************************************************************************************************************************************************************
     *                                                       Start of themes                                                                       *
     ******************************************************************************************************************************************************************/
    
     // Http call to add a theme to the database.
    addTheme(themeName: string, themeID: string, description: string, css: string, colours: any[]): Observable<any> {
        let body = { "name": themeName, "themeID": themeID, "description": description, "css": css, "colours": colours };
        return this.http.post(this.addThemeListUrl, body, this.httpHeaders).pipe(
            map(data => {
                return data;
            }),
            catchError(this.helperService.handleHttpError)
        );
    }

    // Http call to update a theme.
    updateTheme(themeName: string, themeID: string, description: string, css: string, colours: any[]): Observable<any> {
        let body = { "name": themeName, "themeID": themeID, "description": description, "css": css, "colours": colours };
        return this.http.patch(this.getThemeListUrl + this.themeIdForEdit, body, this.httpHeaders).pipe(
            map(data => {
                return data;
            }),
            catchError(this.helperService.handleHttpError)
        );
    }

    // Http call to get a theme by id for editing.
    getThemeById() {
        return this.http.get(this.getThemeListUrl + this.themeIdForEdit, this.httpHeaders).pipe(
            map(data => {
                return data;
            }),
            catchError(this.helperService.handleHttpError)
        );
    }

    // Http call to get a theme by id for editing.
    getInitalTheme(id: string) {
        return this.http.get(this.getThemeListUrl + id, this.httpHeaders).pipe(
            map(data => {
                return data;
            }),
            catchError(this.helperService.handleHttpError)
        );
    }

    // Http call to delete a theme from the database.
    deleteTheme(): Observable<any> {
        return this.http.delete(this.getThemeListUrl + this.themeIdForEdit, this.httpHeaders).pipe(
            map(data => {
                return data;
            }),
            catchError(this.helperService.handleHttpError)
        );    
    }

    getThemesList(): Observable<any> {
        return this.http.get(this.getThemeListUrl, this.httpHeaders).pipe(
            map((res: HttpResponse<any>) => {
                return res;
            }),
            catchError(this.helperService.handleHttpError)
        );
    }
    /******************************************************************************************************************************************************************
       *                                                       End of Themes                                                                        *
    ******************************************************************************************************************************************************************/
}