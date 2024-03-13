import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserModelEx } from 'models/users.model';
import { apiUrl } from '../apiUrl';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {

  constructor(private http: HttpClient) { }

  //ADMIN USER SECTION
  fetchUsers(): Observable<IUserModelEx[]> {
    return this.http.get<IUserModelEx[]>(`${apiUrl.adminPanelApi}users`);
  }
}
