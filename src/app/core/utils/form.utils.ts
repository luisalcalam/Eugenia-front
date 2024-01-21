import { FormControl, FormGroup } from '@angular/forms';

export class FormUtils {
  public static checkAndUpdateForm(formGroup: FormGroup) {
    for (const key in formGroup.controls) {
      formGroup.controls[key].markAsDirty();
      formGroup.controls[key].updateValueAndValidity();
    }
  }

  public static checkAndUpdateFormControl(formControl: FormControl) {
    formControl.markAsDirty();
    formControl.updateValueAndValidity();
  }
}
