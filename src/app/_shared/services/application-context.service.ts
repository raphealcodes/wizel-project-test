import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationContextService {

  commentData$ = new BehaviorSubject<any>(null);
  userData$ = new BehaviorSubject<any>(null);
  constructor() { }

   //-------------------- Comment Observable ---------------------------//

   getCommentInformation(): Observable<any> {
    return this.commentData$.asObservable();
  }

  //-------------------------- Comment Observable ---------------------//

     //-------------------- User Observable ---------------------------//

     getUserInformation(): Observable<any> {
      return this.userData$.asObservable();
    }

    //-------------------------- User Observable ---------------------//
}
