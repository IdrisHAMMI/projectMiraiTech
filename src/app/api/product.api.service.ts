import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { ProductPreview } from '../../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor(private http: HttpClient) { }

  getProduct() {
    return this.http.get("http://localhost:3000/api/item/productsFetch");
  }
}

module.exports = ProductApiService;