import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RestApiService {
  constructor(private http: HttpClient) { }

  get<T>(url: string, options?) {
    return this.http.get<T>(url, options);
  }

  post<T>(url: string, options?: any){
    return this.http.post( url, options,);
  }

  put<T>(url: string, options?: any): Observable<any> {
    return this.http.put( url, options);
  }

  delete(url: string, options?: any) {
    return this.http.delete( url, options);
  }


}
