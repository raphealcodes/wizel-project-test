import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './third-party/material.module';
import { LoaderComponent } from './components/loader/loader.component';
import { Loader2Component } from './components/loader_2/loader.component';
import { CreateCommentComponent } from './dialogs/create-comment/create-comment.component';
import { TableListComponent } from './components/table-list/table-list.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { PaginationFooterComponent } from './components/pagination-footer/pagination-footer.component';
import { CreateUserComponent } from './dialogs/create-user/create-user.component';




@NgModule({
  declarations: [
    LoaderComponent,
    Loader2Component,
    CreateCommentComponent,
    TableListComponent,
    SnackBarComponent,
    PaginationFooterComponent,
    CreateUserComponent
  ],
  providers: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule, ReactiveFormsModule,
    MaterialModule,
    LoaderComponent,
    Loader2Component,
    CreateCommentComponent,
    TableListComponent,
    SnackBarComponent,
    PaginationFooterComponent,
    CreateUserComponent
  ]
})
export class SharedModule { }
