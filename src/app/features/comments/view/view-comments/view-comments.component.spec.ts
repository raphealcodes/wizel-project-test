/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCommentsComponent } from './view-comments.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@app/_shared/shared.module';

describe('ViewCommentsComponent', () => {
  let component: ViewCommentsComponent;
  let fixture: ComponentFixture<ViewCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCommentsComponent ],
      imports: [HttpClientModule, SharedModule]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCommentsComponent ],
      imports: [HttpClientModule, SharedModule]
    })

    fixture = TestBed.createComponent(ViewCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
