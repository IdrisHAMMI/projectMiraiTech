import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiUrl } from '../apiUrl';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}
  
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  registerService(registerObj: any){
    return this.http.post<any>(`${apiUrl.authServiceApi}register`, registerObj);
  }
  loginService(registerObj: any){
    return this.http.post<any>(`${apiUrl.authServiceApi}login`, registerObj);
  }

  sendEmailService(email: string){
    return this.http.post<any>(`${apiUrl.authServiceApi}send-email`, {email: email});
  }

  resetPasswordService(resetObj: any){
    return this.http.post<any>(`${apiUrl.authServiceApi}reset-password`, resetObj);
  }

  getUserState(id: string, isAdmin: boolean) {
    let params = new HttpParams().set('isAdmin', isAdmin.toString());

    return this.http.get<any>(`${apiUrl.authServiceApi}user/state/${id}`, { params });
 }

  isLoggedIn(){
    return !!localStorage.getItem("UID");
  }
}
