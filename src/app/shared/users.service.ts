import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Users } from './users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  selectedUsers: Users = new Users();
  users: Users[] = [];
  constructor() { }
}
