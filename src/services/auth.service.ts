import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from './apiUrl';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);

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
  isLoggedIn(){
    return !!localStorage.getItem("UID");
  }

}
