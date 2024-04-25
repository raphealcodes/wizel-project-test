/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CreateCommentComponent } from './create-comment.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '@app/_shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { ApplicationContextService } from '@app/_shared/services/application-context.service';
import { CommentService } from '@app/_shared/services/comment.service';
import { CommentsComponent } from '@app/features/comments/comments.component';

describe('CreateCommentComponent', () => {
  let component: CreateCommentComponent;
  let fixture: ComponentFixture<CreateCommentComponent>;
  let commentService: CommentService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCommentComponent ],
      imports: [ MatDialogModule, SharedModule, BrowserAnimationsModule, HttpClientModule],
      providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
      ]
    })
    .compileComponents();
     commentService = TestBed.inject(CommentService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should be valid if comment form value is valid', () => {
    component.commentForm.setValue({
      name: 'Rapheal',
      email: 'rapheal@gmail.com',
      body: 'Lorem ipsum dolor sit amet consecteur, sed diam euismod erat'
    });

    expect(component.commentForm.valid).toEqual(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
