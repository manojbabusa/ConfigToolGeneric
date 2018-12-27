import { HttpResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class HelperService {

  // Handle Http errors.
  public handleHttpError(error: HttpResponse<any>) {
    return throwError(error || 'Server error');
  }

}
