import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommentDTO } from '@app/_shared/models/comments-interface';
import { ApplicationContextService } from '@app/_shared/services/application-context.service';
import { CommentService } from '@app/_shared/services/comment.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-view-comments',
  templateUrl: './view-comments.component.html',
  styleUrls: ['./view-comments.component.scss'],
})
export class ViewCommentsComponent implements OnInit {
  commentColumn: any = [
    { name: 'name', title: 'Name', type: 'longText' },
    { name: 'email', title: 'Email', type: '' },
    { name: 'body', title: 'Body', type: 'longText' },
    { name: 'action', title: '', type: 'action' },
  ];
  tableType: string = 'comments';
  container: any = {
    loading: false
  };
  commentData: CommentDTO[] = [];
  constructor(
    private appContext: ApplicationContextService,
    private commentService: CommentService
  ) {}

  ngOnInit() {
     this.getCommentData();
  }


  getCommentData(): void {
    this.container['loading'] = true;
    this.commentService.getComments().subscribe({
      next: (response: CommentDTO[]) => {
        if (response) {
          this.commentData = response;
          this.appContext.commentData$.next(response);
          this.container['loading'] = false;
        }
      },
      error: () => {},
    });
  }

}
