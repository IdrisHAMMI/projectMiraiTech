import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IProductReviewDocument} from './../../../models/product.model'; // Import the product interface
import { apiUrl } from '../apiUrl';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }
  //FETCHES PRODUCTS
  getProducts(): Observable<IProductReviewDocument[]> {
    return this.http.get<IProductReviewDocument[]>(`${apiUrl.productServiceApi}`);
  }
}