import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = 'http://localhost:3000/users'; // Update with your API URL

  constructor(private http: HttpClient) {}

  login(credentials: { username: string, password: string }): Observable<any> {
    const loginData = {
      username: credentials.username,
      password: credentials.password
    };
    return this.http.post(`${this.baseURL}/login`, loginData);
  }
}

