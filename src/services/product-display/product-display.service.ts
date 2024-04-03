import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
