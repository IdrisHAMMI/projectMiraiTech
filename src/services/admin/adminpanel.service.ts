import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserModelEx } from './../../../models/users.model';
import {IProductDocument} from './../../../models/product.model'; // Import the product interface
import { apiUrl } from '../apiUrl';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {

  constructor(private http: HttpClient) { }

  //ADMIN USER SECTION//

  //FETCHES USER
  fetchUsers(): Observable<IUserModelEx[]> { 
    return this.http.get<IUserModelEx[]>(`${apiUrl.adminPanelApi}data/users`);
  }

  createUsers(user: IUserModelEx): Observable<IUserModelEx> {
    return this.http.post<IUserModelEx>(`${apiUrl.adminPanelApi}create/users`, user);
  }

  //DELETES USER
  deleteUsers(id: string) {                            
    return this.http.delete<IUserModelEx[]>(`${apiUrl.adminPanelApi}delete/users/${id}`);
  }

  //ADMIN PRODUCT SECTION//

  //CREATES PRODUCT
  createProduct(product: IProductDocument): Observable<IProductDocument> {
    return this.http.post<IProductDocument>(`${apiUrl.productServiceApi}newProduct`, product);
  }
  //FETCHES PRODUCT
  getProducts(): Observable<IProductDocument[]> {
     return this.http.get<IProductDocument[]>(`${apiUrl.productServiceApi}`);
  }
    //DELETES USER
  deleteProduct(id: string) {                            
    return this.http.delete<IProductDocument[]>(`${apiUrl.adminPanelApi}delete/product/${id}`);
  }
}
