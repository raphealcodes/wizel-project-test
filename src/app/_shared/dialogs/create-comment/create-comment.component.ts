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
import { FormErrors, ValidationMessages } from './create-comment.validators';
import { Subscription, of, take } from 'rxjs';
import { CommentDTO } from '@app/_shared/models/comments-interface';
import { CommentService } from '@app/_shared/services/comment.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss'],
})
export class CreateCommentComponent implements OnInit {
  commentForm!: FormGroup;
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
    public _dialogRef: MatDialogRef<CreateCommentComponent>,
    private commentService: CommentService
  ) {}

  ngOnInit() {
    const commentData: CommentDTO = this.data ? this.data : of({});
    this.populateForm(commentData);
  }

  populateForm(comment?: CommentDTO) {
    this.commentForm = this.fb.group({
      name: [comment?.name, Validators.required],
      email: [
        comment?.email,
        [Validators.required, Validators.pattern(this.commonServices.email)],
      ],
      body: [comment?.body, Validators.required],
    });
  }

  controlChanged(ctrlName: string) {
    this.errors = this.commonServices.controlnvalid(
      this.commentForm.get(ctrlName) as FormControl
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
    if (this.commentForm.invalid) {
      this.uiErrors = JSON.parse(JSON.stringify(this.formErrors));
      this.errors = this.commonServices.findInvalidControlsRecursive(
        this.commentForm
      );
      this.displayErrors();
      this.submitting = false;
      return;
    }
    const fd = JSON.parse(JSON.stringify(this.commentForm.value));
    // let name = fd.name
    fd.postId = 10;
    if (this.data.id) {
      fd.id = this.data.id;
     this.commentService.updateComment(fd)
      .pipe(take(1))
      .subscribe(
        (response: CommentDTO) => {
          this.submitting = false;
          this.commonServices.snackBar(
            this.commonServices?.snackbarIcon?.success,
            'Comment Update Successfully',
            'success'
          );
          this._dialogRef.close(response);
        },
        (errResp) => {
          this.submitting = false;
          this.commonServices.snackBar(
            this.commonServices?.snackbarIcon?.error,
            'Comment Update Failed',
            'error'
          );
        }
      );
    } else {
      this.commentService.createComment(fd)
        .pipe(take(1))
        .subscribe(
          (response: CommentDTO) => {
            this.submitting = false;
            this.commonServices.snackBar(
              this.commonServices?.snackbarIcon?.success,
              'Comment Added Successfully',
              'success'
            );
            this._dialogRef.close(response);
          },
          (errResp) => {
            this.submitting = false;
            this.commonServices.snackBar(
              this.commonServices?.snackbarIcon?.error,
              'Comment Added Failed',
              'error'
            );
          }
        );
    }

  }
}
