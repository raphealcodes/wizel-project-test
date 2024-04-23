import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateCommentComponent } from '@app/_shared/dialogs/create-comment/create-comment.component';
import { CreateUserComponent } from '@app/_shared/dialogs/create-user/create-user.component';
import { CommentDTO } from '@app/_shared/models/comments-interface';
import { UserDTO } from '@app/_shared/models/users-interface';
import { ApplicationContextService } from '@app/_shared/services/application-context.service';
import { Observable, Subscription, debounceTime, fromEvent } from 'rxjs';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: any;

  sideNavMode: any = 'side';
  sideNavOpen = true;
  resizeObservable$!: Observable<Event>;
  sidenavSubscription$!: Subscription;
  sidenavClickSubscription$!: Subscription;

  commentsData: CommentDTO[] = [];
  usersData: UserDTO[] = [];
  commentSubscription$: Subscription = new Subscription();
  userSubscription$: Subscription = new Subscription();

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private appContext: ApplicationContextService,
  ) {}

  ngOnInit() {
    this.setupSideBar();
    this.sidenavFunction();

    this.commentSubscription$ = this.appContext.commentData$.subscribe(
      (commentData: any) => {
        this.commentsData = commentData;
      }
    );

    this.userSubscription$ = this.appContext.userData$.subscribe(
      (userData: any) => {
        this.usersData = userData;
      }
    );
  }

  addNewEntry() {
    const url: any = this.router.url.split('/')[2];
    if (url === 'comments') {
       this.createComment();
    } else if (url === 'users') {
       this.createUser();
    }
  }

  createComment() {
    const commentDialog = this.dialog.open(CreateCommentComponent, {
      data: {},
      autoFocus: false,
      width: '480px',
      // height: '100vh',
      maxHeight: '510px',
      disableClose: true,
    });
    commentDialog.afterClosed().subscribe((result) => {
      if(result) {
      this.commentsData.unshift(result);
      this.appContext.commentData$.next(this.commentsData);
      }
    });
  }

  createUser() {
    const userDialog = this.dialog.open(CreateUserComponent, {
      data: {},
      autoFocus: false,
      width: '480px',
      // height: '100vh',
      maxHeight: '510px',
      disableClose: true,
    });
    userDialog.afterClosed().subscribe((result) => {
      if(result) {
      this.usersData.unshift(result);
      this.appContext.userData$.next(this.usersData);
      }
    });
  }

  setupSideBar() {
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.sidenavSubscription$ = this.resizeObservable$
      .pipe(debounceTime(500))
      .subscribe((evt) => this.sidenavFunction());

    let button = document.querySelectorAll('.menu-section-bottom a');
    let sidenavClick$ = fromEvent(button, 'click');

    this.sidenavClickSubscription$ = sidenavClick$.subscribe((evt) => {
      if (window.innerWidth < 991) {
        this.sidenav.close();
      }
    });
  }

  sidenavFunction() {
    let browserWidth = window.innerWidth;
    if (browserWidth < 991) {
      this.sideNavMode = 'over';
      this.sideNavOpen = false;
    } else {
      this.sideNavMode = 'side';
      this.sideNavOpen = true;
    }
  }

  ngOnDestroy() {
    if (this.sidenavSubscription$) this.sidenavSubscription$.unsubscribe();
    if (this.sidenavClickSubscription$)
      this.sidenavClickSubscription$.unsubscribe();
  }
}
