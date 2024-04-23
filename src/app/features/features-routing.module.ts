import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeaturesComponent } from './features.component';

const routes: Routes = [
  {
    path: 'app',
    component: FeaturesComponent,
    children: [
        {path: '', redirectTo: 'comments', pathMatch: 'full'},
        {
          path: 'comments',
          loadChildren: () => import('../features/comments/comments.module').then(m => m.CommentsModule),
        },
        {
          path: 'users',
          loadChildren: () => import('../features/users/users.module').then(m => m.UsersModule),
        },

        ],
      },
      {path: '', redirectTo: '/app/comments', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
