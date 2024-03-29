import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../../../services/product/product.service';
import { IProductDocument } from './../../../../../models/product.model'; // Correct import
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
  
  products: IProductDocument[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (res) => {
        res.forEach((product: any) => {
          product.productImageURL = 'assets/upload/' + product.productImageURL;
        });
        this.products = res;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        alert("error while fetching products data");
      }
    });
  }
}