/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Loader2Component } from './loader.component';
import { SharedModule } from '@app/_shared/shared.module';

describe('LoaderComponent', () => {
  let component: Loader2Component;
  let fixture: ComponentFixture<Loader2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Loader2Component ],
      imports: [SharedModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Loader2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
