/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CommentService } from './comment.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommentDTO, CommentData } from '../models/comments-interface';

describe('Service: Comment', () => {
  let service: CommentService;
  let httpController: HttpTestingController;
  let url = 'https://jsonplaceholder.typicode.com';
  let commentDO: CommentDTO = {
    id: 1,
    postId: 10,
    name: 'Rapheal',
    email: 'rapheal@gmail.com',
    body: 'Lorem ipsum dolor sit amet consecteur, sed diam euismod erat'
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CommentService);
    httpController = TestBed.inject(HttpTestingController)
  });


    it('getComments() should be called', () => {
      service.getComments().subscribe((data) => { // now have to subscribe getComments method to get data
        expect(data).toEqual(CommentData);
      });
      httpController.expectOne({
        method: 'GET',
        url: `${url}/comments`,
      }).flush(CommentData);
    });

    it('should call createComment and the API should return the comment that was added', () => {
      service.createComment(commentDO).subscribe((data) => {
        expect(data).toEqual(commentDO);
      });

   httpController.expectOne({
        method: 'POST',
        url: `${url}/comments`,
      }).flush(commentDO);
    });

    it('should call updateComment and the API should return the comment that was updated', () => {
      service.updateComment(commentDO).subscribe((data) => {
        expect(data).toEqual(commentDO);
      });

   httpController.expectOne({
        method: 'PUT',
        url: `${url}/comments/${commentDO.id}`,
      }).flush(commentDO);
    });

  it('should be created', inject([CommentService], (service: CommentService) => {
    expect(service).toBeTruthy();
  }));

  afterEach(() => {
    httpController.verify();
  });

});
