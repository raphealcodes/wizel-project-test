import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommentDTO } from '@app/_shared/models/comments-interface';
import { ApplicationContextService } from '@app/_shared/services/application-context.service';
import { CommonService } from '@app/_shared/services/common.service';
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
  constructor(
    private appContext: ApplicationContextService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.container['loading'] = true;
    this.http.get<CommentDTO>(environment.BASE_URL + '/comments').subscribe({
      next: (response: CommentDTO) => {
        if (response) {
          this.appContext.commentData$.next(response);
          this.container['loading'] = false;
        }
      },
      error: () => {},
    });
  }
}
