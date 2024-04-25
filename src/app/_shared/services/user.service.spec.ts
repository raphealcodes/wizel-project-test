/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserDTO, UserData, addressData, companyData } from '../models/users-interface';

describe('Service: User', () => {
  let service: UserService;
  let httpController: HttpTestingController;
  let url = 'https://jsonplaceholder.typicode.com';
  let UserDO: UserDTO = {
    id: 1,
    name:     'Rapheal',
    username: 'Big Raph',
    email:    'string@example .com',
    address:  addressData,
    phone:    '0979894835',
    website:  'google.com',
    company:  companyData
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpController = TestBed.inject(HttpTestingController)
  });

  it('getUsers() should be called', () => {
    service.getUsers().subscribe((data) => { // now have to subscribe getUsers method to get data
      expect(data).toEqual(UserData);
    });
    httpController.expectOne({
      method: 'GET',
      url: `${url}/users`,
    }).flush(UserData);
  });

  it('should call createUser and the API should return the user that was added', () => {
    service.createUser(UserDO).subscribe((data) => {
      expect(data).toEqual(UserDO);
    });

 httpController.expectOne({
      method: 'POST',
      url: `${url}/users`,
    }).flush(UserDO);
  });

  it('should call updateUser and the API should return the user that was updated', () => {
    service.updateUser(UserDO).subscribe((data) => {
      expect(data).toEqual(UserDO);
    });

 httpController.expectOne({
      method: 'PUT',
      url: `${url}/users/${UserDO.id}`,
    }).flush(UserDO);
  });

  it('should ...', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  afterEach(() => {
    httpController.verify();
  });

});
