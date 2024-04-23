import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CreateCommentComponent } from '@app/_shared/dialogs/create-comment/create-comment.component';
import { CreateUserComponent } from '@app/_shared/dialogs/create-user/create-user.component';
import { ApplicationContextService } from '@app/_shared/services/application-context.service';
import { CommonService } from '@app/_shared/services/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
})
export class TableListComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() tableType: string = '';
  @Input() tableColumn: any = [];
  tableDataSource = new MatTableDataSource<any>([]);
  tableColumnsToDisp: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  commentSubscription$: Subscription = new Subscription();
  userSubscription$: Subscription = new Subscription();

  container: any = {};
  displayedItems: any[] = [];
  totalItems: number = 0;
  currentPage = 1;
  itemsPerPage: number = 7;

  constructor(
    private dialog: MatDialog,
    private appContext: ApplicationContextService
  ) {}

  ngOnInit() {
    if (this.tableType === 'comments') {
      this.commentSubscription$ = this.appContext.commentData$.subscribe(
        (commentData: any) => {
          this.container['data'] = commentData;
          this.totalItems = this.container['data'].length;
          this.updateDisplayedItems();
        }
      );
    } else if (this.tableType === 'users') {
      this.userSubscription$ = this.appContext.userData$.subscribe(
        (userData: any) => {
          this.container['data'] = userData;
          this.totalItems = this.container['data'].length;
          this.updateDisplayedItems();
        }
      );

    }
    this.tableColumnsToDisp = this.tableColumn.map((col: any) => col.name);
  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.paginator;
  }

  editCommentTable(table: any) {
    const entryDialog = this.dialog.open(CreateCommentComponent, {
      data: table,
      autoFocus: false,
      width: '480px',
      // height: '100vh',
      maxHeight: '510px',
      disableClose: true,
    });
    entryDialog.afterClosed().subscribe((result) => {
      if (result) {
        //Find index of specific object using findIndex method.
        const objIndex = this.container['data'].findIndex(
          (obj: any) => obj.id == result.id
        );
        //Update object's name property.
        this.container['data'][objIndex] = result;
        this.appContext.commentData$.next(this.container['data']);
        this.updateDisplayedItems();
      }
    });
  }

  editUserTable(table: any) {
    const entryDialog = this.dialog.open(CreateUserComponent, {
      data: table,
      autoFocus: false,
      width: '480px',
      // height: '100vh',
      maxHeight: '510px',
      disableClose: true,
    });
    entryDialog.afterClosed().subscribe((result) => {
      if (result) {
        //Find index of specific object using findIndex method.
        const objIndex = this.container['data'].findIndex(
          (obj: any) => obj.id == result.id
        );
        //Update object's name property.
        this.container['data'][objIndex] = result;
        this.appContext.userData$.next(this.container['data']);
        this.updateDisplayedItems();
      }
    });
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.updateDisplayedItems();
    // You can fetch data based on the page number here
  }

  updateSelectedItemsPerPage(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.updateDisplayedItems();
  }

  updateDisplayedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedItems = this.container['data'].slice(startIndex, endIndex);
    this.tableDataSource = new MatTableDataSource<any>(
      this.displayedItems
    );
  }

  ngOnDestroy(): void {
    this.userSubscription$.unsubscribe();
    this.commentSubscription$.unsubscribe();
  }
}
