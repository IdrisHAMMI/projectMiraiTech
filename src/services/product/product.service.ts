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

  createProduct(product: IProductReviewDocument): Observable<IProductReviewDocument> {
    return this.http.post<IProductReviewDocument>(`${apiUrl.productServiceApi}newProduct`, product);
  }
  
  getProducts(): Observable<IProductReviewDocument[]> {
    return this.http.get<IProductReviewDocument[]>(`${apiUrl.productServiceApi}`);
  }
}