import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { ViewUsersComponent } from './view/view-users/view-users.component';
const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'view',
        component: ViewUsersComponent
      },
      { path: '', redirectTo: 'view', pathMatch: 'full' }
    ]
   },
   { path: '', redirectTo: '/app/users/view', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
