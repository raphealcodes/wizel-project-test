/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CreateUserComponent } from './create-user.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { SharedModule } from '@app/_shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUserComponent],
      imports: [
        MatDialogModule,
        SharedModule,
        BrowserAnimationsModule,
        HttpClientModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be valid if user form value is valid', () => {
    component.userForm.setValue({
      name: 'Rapheal',
      username: 'Big Raph',
      email: 'rapheal@gmail.com',
      phone: '09036472374',
      website: 'google.com',
      street: 'eat view ',
      suite: '197293',
      city: 'Lagos',
      zipcode: '',
      companyName: 'Rapheal Enterprises',
      catchphrase: '',
      bs: '',
      lat: '',
      lng: '',
    });

    expect(component.userForm.valid).toEqual(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
