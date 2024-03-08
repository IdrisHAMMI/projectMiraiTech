import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../../../services/product/product.service';
import { IProductReviewDocument } from './../../../../../models/product.model'; // Correct import
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
  
  products: IProductReviewDocument[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
