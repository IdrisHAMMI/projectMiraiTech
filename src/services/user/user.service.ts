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

  getUsernameById(id: string) {
    return this.http.get<any>(`${apiUrl.authServiceApi}${id}`);
  }
}
