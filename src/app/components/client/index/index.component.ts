import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../../../services/product/product.service';
import { ProductDisplayService } from 'src/services/product-display/product-display.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
  
  products: any;
  
  constructor(private productService: ProductService,
    private productDisplayApi: ProductDisplayService,
    ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  onProductClick(product: any) {
    this.productDisplayApi.selectedProduct = product;
  }

}

