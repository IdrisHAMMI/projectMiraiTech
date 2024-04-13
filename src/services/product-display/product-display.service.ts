import { CartModel, ICartModel } from './../../../models/cart.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { Observable } from 'rxjs';
import {IProductDocument} from './../../../models/product.model'; // Import the product interface
import { apiUrl } from '../apiUrl';

@Injectable({
  providedIn: 'root'
})
export class ProductDisplayService {

  selectedProduct: any;

  constructor(private http: HttpClient) { }
  
  getProductsById(id: string): Observable<IProductDocument[]> {
    return this.http.get<IProductDocument[]>(`${apiUrl.productServiceApi}get/${id}`);
  }

  addToCart(productId: string, ownerId: string): Observable<ICartModel[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { ownerId, productId };
    return this.http.post<ICartModel[]>(`${apiUrl.cartServiceApi}add/${productId}`, body, { headers });
  }

  getCart(ownerId: string): Observable<ICartModel[]> {
    return this.http.get<ICartModel[]>(`${apiUrl.cartServiceApi}get/${ownerId}`)
  }

  removeCartProduct(ownerId: string, productId: string): Observable<ICartModel[]> {
    return this.http.delete<ICartModel[]>(`${apiUrl.cartServiceApi}${ownerId}/delete/${productId}`);
   }

}
