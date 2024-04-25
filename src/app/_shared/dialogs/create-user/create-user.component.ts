import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { CommonService } from '@app/_shared/services/common.service';
import { FormErrors, ValidationMessages } from './create-user.validators';
import { of, take } from 'rxjs';
import { Address, Company, Geo, UserDTO } from '@app/_shared/models/users-interface';
import { UserService } from '@app/_shared/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  userForm!: FormGroup;
  errors: any = [];
  formErrors: any = FormErrors;
  uiErrors: any = FormErrors;
  validationMessages: any = ValidationMessages;
  submitting: boolean = false;

  now = new Date();



  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private commonServices: CommonService,
    public _dialogRef: MatDialogRef<CreateUserComponent>,
    private userService: UserService
  ) {}

  ngOnInit() {


    const userData: UserDTO = this.data ? this.data : of({});
    this.populateForm(userData);
  }

  populateForm(user?: UserDTO) {
    this.userForm = this.fb.group({
      name: [user?.name, Validators.required],
      email: [
        user?.email,
        [Validators.required, Validators.pattern(this.commonServices.email)],
      ],
      username: [user?.username, Validators.required],
      street: [user?.address?.street, Validators.required],
      suite: [user?.address?.suite, Validators.required],
      city: [user?.address?.city, Validators.required],
      zipcode: [user?.address?.zipcode],
      lat: [user?.address?.geo?.lat],
      lng: [user?.address?.geo?.lng],
      phone: [user?.phone, Validators.required],
      website: [user?.website, Validators.required],
      companyName: [user?.company?.name, Validators.required],
      catchphrase: [user?.company?.catchPhrase],
      bs: [user?.company?.bs],
    });
  }

  controlChanged(ctrlName: string) {
    this.errors = this.commonServices.controlnvalid(
      this.userForm.get(ctrlName) as FormControl
    );
    if (Object.keys(this.errors).length === 0) {
      this.errors[ctrlName] = {};
      this.uiErrors[ctrlName] = '';
    }
    this.displayErrors();
  }

  displayErrors() {
    Object.keys(this.formErrors).forEach((control) => {
      this.formErrors[control] = '';
    });
    Object.keys(this.errors).forEach((control: any) => {
      Object.keys(this.errors[control]).forEach((error: any) => {
        this.uiErrors[control] = this.validationMessages[control][error];
      });
    });
  }

  onSubmit() {
    this.submitting = true;
    if (this.userForm.invalid) {
      this.uiErrors = JSON.parse(JSON.stringify(this.formErrors));
      this.errors = this.commonServices.findInvalidControlsRecursive(
        this.userForm
      );
      this.displayErrors();
      this.submitting = false;
      return;
    }
    const fd = JSON.parse(JSON.stringify(this.userForm.value));

    const company: Company = {
      name: fd.companyName,
      bs: fd.bs,
      catchPhrase: fd.catchphrase
    };
    const geo: Geo = {
        lat: fd.lat,
        lng: fd.lng
    };
   const address: Address = {
      street: fd.street,
      suite: fd.suite,
      city: fd.city,
      zipcode: fd.zipcode,
      geo: geo
    };
    fd.company = company;
    fd.address = address;

    delete fd.companyName;
    delete fd.bs;
    delete fd.catchphrase;
    delete fd.lat;
    delete fd.lng;
    delete fd.street;
    delete fd.suite;
    delete fd.city;
    delete fd.zipcode;

    if (this.data.id) {
      fd.id = this.data.id;
      this.userService.updateUser(fd)
      .pipe(take(1))
      .subscribe(
        (response: UserDTO) => {
          this.submitting = false;
          this.commonServices.snackBar(
            this.commonServices?.snackbarIcon?.success,
            'User Update Successfully',
            'success'
          );
          this._dialogRef.close(response);
        },
        (errResp) => {
          this.submitting = false;
          this.commonServices.snackBar(
            this.commonServices?.snackbarIcon?.error,
            'User Update Failed',
            'error'
          );
        }
      );
    } else {
      this.userService.createUser(fd)
        .pipe(take(1))
        .subscribe(
          (response: UserDTO) => {
            this.submitting = false;
            this.commonServices.snackBar(
              this.commonServices?.snackbarIcon?.success,
              'User Added Successfully',
              'success'
            );
            this._dialogRef.close(response);
          },
          (errResp) => {
            this.submitting = false;
            this.commonServices.snackBar(
              this.commonServices?.snackbarIcon?.error,
              'User Added Failed',
              'error'
            );
          }
        );
    }

  }
}
