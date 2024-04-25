/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ViewUsersComponent } from './view-users.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@app/_shared/shared.module';

describe('ViewUsersComponent', () => {
  let component: ViewUsersComponent;
  let fixture: ComponentFixture<ViewUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUsersComponent ],
      imports: [SharedModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
