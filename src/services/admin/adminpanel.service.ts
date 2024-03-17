import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserModelEx } from './../../../models/users.model';
import {IProductReviewDocument} from './../../../models/product.model'; // Import the product interface
import { apiUrl } from '../apiUrl';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {

  constructor(private http: HttpClient) { }

  //ADMIN USER SECTION

  //FETCHES USER
  fetchUsers(): Observable<IUserModelEx[]> { 
    return this.http.get<IUserModelEx[]>(`${apiUrl.adminPanelApi}data/users`);
  }

  //DELETES USER
  deleteUsers(id: string) {                            
    return this.http.delete<IUserModelEx[]>(`${apiUrl.adminPanelApi}delete/users/${id}`);
  }

  //ADMIN PRODUCT SECTION

  //CREATES PRODUCT
  createProduct(product: IProductReviewDocument): Observable<IProductReviewDocument> {
    return this.http.post<IProductReviewDocument>(`${apiUrl.productServiceApi}newProduct`, product);
  }
}
