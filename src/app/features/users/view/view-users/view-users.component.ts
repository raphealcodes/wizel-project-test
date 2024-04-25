import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserDTO } from '@app/_shared/models/users-interface';
import { ApplicationContextService } from '@app/_shared/services/application-context.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {
  userColumn: any = [
    { name: 'name', title: 'Name', type: '' },
    { name: 'username', title: 'UserName', type: '' },
    { name: 'email', title: 'Email', type: '' },
    { name: 'address', title: 'Address', type: 'address' },
    { name: 'phone', title: 'Phone', type: '' },
    { name: 'website', title: 'Website', type: '' },
    { name: 'company', title: 'Company', type: 'company' },
    { name: 'action', title: '', type: 'action' },
  ];
  tableType: string = 'users';
  container: any = {
    loading: false
  };
  constructor(
    private appContext: ApplicationContextService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.container['loading'] = true;
    this.http.get<any>(environment.BASE_URL + '/users').subscribe({
      next: (response: UserDTO) => {
        if (response) {
          this.appContext.userData$.next(response);
          this.container['loading'] = false;
        }
      },
      error: () => {},
    });
  }

}
