import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from '../models/users-interface';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserDTO[]> {
    return this.http
    .get<UserDTO[]>(`${environment.BASE_URL}/users`);
  }

  updateUser(user: UserDTO) {
    return this.http
    .put<UserDTO>(`${environment.BASE_URL}/users/${user.id}`, user);
  }

  createUser(user: UserDTO) {
    return this.http
    .post<UserDTO>(`${environment.BASE_URL}/users`, user);
  }

}
