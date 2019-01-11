import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestApiService } from './helper.httpServices';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private apiUrlGET = 'https://bdaconfigtool-apimanagement.azure-api.net/api/v1/';

  constructor(private http: RestApiService) { }

  getItems(): Observable<any> {
    return this.http.get<any>(this.apiUrlGET + 'referencedata/getregionlist');
  }
}
