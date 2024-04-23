import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  snackbarIcon = {
    success: 'ri-checkbox-circle-fill',
    error: 'ri-close-circle-fill',
    info: 'ri-information-2-fill'
  };

  duration: number = 4000;
  verticalPosition: MatSnackBarVerticalPosition | undefined = 'top'; // 'top' | 'bottom'
  horizontalPosition: MatSnackBarHorizontalPosition | undefined = 'end'; //'start' | 'center' | 'end' | 'left' | 'right'

  container: any = {};
  constructor(
    private _snackBar: MatSnackBar,
  ) { }


  findInvalidControlsRecursive(formToInvestigate: FormGroup| FormArray): string[] {
    const invalidControls: any = {};
    const recursiveFunc = (form: FormGroup| FormArray) => {
      Object.keys(form.controls).forEach(field => {
        const control = form.get(field);
        if (control?.invalid && !(control instanceof FormArray) && !(control instanceof FormGroup)) {
          invalidControls[field] = control.errors;
        }
        if (control instanceof FormGroup) {
          recursiveFunc(control);
        } else if (control instanceof FormArray) {
          recursiveFunc(control);
        }
      });
    }
    recursiveFunc(formToInvestigate);
    return invalidControls;
  }

  controlnvalid(controlToInvestigate: FormControl | any): string[] | any {
    const invalidControls: any = {};
    if (controlToInvestigate?.invalid ) {
      const controlName: any = (Object.keys(controlToInvestigate.parent.controls).find(key => controlToInvestigate.parent.controls[key] === controlToInvestigate))
      invalidControls[controlName] = controlToInvestigate.errors;
    }
    return invalidControls;
  }

  displayErrors(formErrors: any, ValidationMessages: any, errors: any, uiErrors: any) {
    Object.keys(formErrors).forEach((control) => {
      formErrors[control] = '';
    });
    Object.keys(errors).forEach((control) => {
      Object.keys(errors[control]).forEach(error => {
        uiErrors[control] = ValidationMessages[control][error];
      })
    });
    return {formErrors: formErrors, uiErrors: uiErrors};
  }

  snackBar(icon: string, message: string, successOrError='success') {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: this.duration,
      verticalPosition: this.verticalPosition,
      horizontalPosition: this.horizontalPosition,
      data: {
        message: message,
        icon: icon,
      },
      panelClass: [successOrError],
    });
  }
}
