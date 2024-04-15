import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../../../services/product/product.service';
import { IProductDocument } from './../../../../../models/product.model'; // Correct import
import { ProductDisplayService } from 'src/services/product-display/product-display.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
  
  products: IProductDocument[] = [];
  
  constructor(private productService: ProductService,
    private productDisplayApi: ProductDisplayService,
    private route: Router ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        alert("error while fetching products data");
      }
    });
  }

  onProductClick(product: any) {
    this.productDisplayApi.selectedProduct = product;
  }
}