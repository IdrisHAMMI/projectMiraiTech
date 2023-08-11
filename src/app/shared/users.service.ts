import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Users } from './users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  selectedUsers: Users = new Users();
  users: Users[] = [];
readonly baseURL = 'http://localhost:3000/users';

  constructor(private http : HttpClient) { }

  postUsers(usrObject: Users) {
    return this.http.post(this.baseURL, usrObject);
  }
}
