// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../apiUrl';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  createShippingAddress(addressData: any): Observable<any> {
    const headers = new HttpHeaders().set('UID', localStorage.getItem('UID'));
    return this.http.post<any>(`${apiUrl.userServiceApi}shipping-address`, addressData, { headers });
}

  getUserDetails(id: string): Observable<any> {
    return this.http.get<any>(`${apiUrl.authServiceApi}user/${id}`)
  }

  updateUserEmailProfile(id: string, email: string): Observable<any> {
    return this.http.put<any>(`${apiUrl.authServiceApi}user/profile/update/${id}`, email)
  }

  getTransactionById(id: string) {
    return this.http.get<any>(`${apiUrl.userServiceApi}transaction/get/${id}`)

  }
}
