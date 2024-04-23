import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '@app/_shared/shared.module';
import { ViewUsersComponent } from './view/view-users/view-users.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ],
  declarations: [
    UsersComponent,
    ViewUsersComponent
  ]
})
export class UsersModule { }
