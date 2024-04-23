import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments.component';
import { CommentsRoutingModule } from './comments-routing.module';
import { SharedModule } from '@app/_shared/shared.module';
import { ViewCommentsComponent } from './view/view-comments/view-comments.component';

@NgModule({
  imports: [
    CommonModule,
    CommentsRoutingModule,
    SharedModule
  ],
  declarations: [
    CommentsComponent,
    ViewCommentsComponent
  ]
})
export class CommentsModule { }
