import { AbstractControl } from "@angular/forms";


export class ImageValidator {

  static imageSizeValidator(maxSize: number) {
    return function (control: AbstractControl) {
      if (control.value[0]) {
        return control.value[0].size > maxSize ? { maxSizeExceeded: true } : null;
      }
      return null;
    };
  }

  static imageExtensionValidator(imageExtension: Array<string>) {
    return (control: AbstractControl) => {
      if (control.value) {
        const extn = control.value.split(".").pop();
        return imageExtension.includes(extn.toLowerCase()) ? null : { invalidImageExtension: true };
      }
      return null;
    };
  }

}
