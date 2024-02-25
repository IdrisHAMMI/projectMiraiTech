// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../apiUrl';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getUsernameById(id: string) {
    return this.http.get<any>(`${apiUrl.authServiceApi}${id}`);
  }
}
