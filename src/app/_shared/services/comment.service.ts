import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentDTO } from '../models/comments-interface';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

constructor(private http: HttpClient) { }

getComments(): Observable<CommentDTO[]> {
  return this.http
  .get<CommentDTO[]>(`${environment.BASE_URL}/comments`);
}

updateComment(comment: CommentDTO) {
  return this.http
  .put<CommentDTO>(`${environment.BASE_URL}/comments/${comment.id}`, comment);
}

createComment(comment: CommentDTO) {
  return this.http
  .post<CommentDTO>(`${environment.BASE_URL}/comments`, comment);
}

}
