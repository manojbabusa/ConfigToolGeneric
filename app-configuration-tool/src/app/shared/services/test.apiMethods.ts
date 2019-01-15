import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestApiService } from './helper.httpServices';
import { environment } from 'src/environments/environment';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';


@Injectable({
  providedIn: 'root'
})
export class TestService {
  private apiUrlGET = 'https://bdaconfigtool-apimanagement.azure-api.net/api/v1/';
  serviceToken: any = [];
  constructor(private http: RestApiService, public auth: MsAdalAngular6Service) { }

  getItems(): Observable<any> {
    return this.http.get<any>(this.apiUrlGET + 'referencedata/getregionlist');
  }

  public getReferenceDataBearerToken() {
    let serviceReq = 'https://login.microsoftonline.com/' + environment.adalConfig.tenant + '/oauth2/v2.0/authorize?client_id=' + environment.adalConfig.clientId + '&response_type=id_token+token&redirect_uri='+ environment.adalConfig.redirectUri + '&response_mode=fragment&state=12345&nonce=' + this.auth.userInfo.profile.nonce + '&scope=openid de445b90-dd02-425d-879e-3797bfba2458/user_impersonation';


    

    let response = this.http.get<any>(serviceReq);

    response.subscribe(data => {
      this.serviceToken = data;
      console.log(this.serviceToken);
    });

  }
}
