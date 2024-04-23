import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommentsComponent } from './comments.component';
import { ViewCommentsComponent } from './view/view-comments/view-comments.component';

const routes: Routes = [
  {
    path: '',
    component: CommentsComponent,
    children: [
      {
        path: 'view',
        component: ViewCommentsComponent
      },
      { path: '', redirectTo: 'view', pathMatch: 'full' }
    ]
   },
   { path: '', redirectTo: '/app/comments/view', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentsRoutingModule { }
