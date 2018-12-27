import { FormControl } from '@angular/forms';

export class PasswordValidator {

  static MatchPassword(controls: FormControl) {
    const password = controls.get('password').value;
    const retypePassword = controls.get('retypePassword').value;
    if (password !== retypePassword) {
      controls.get('retypePassword').setErrors({ matchPassword: true });
    } else {
      return null
    }
  }

}
