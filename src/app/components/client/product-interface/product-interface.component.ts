import { IProductDocument } from './../../../../../models/product.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { result } from 'lodash';
import { ProductDisplayService } from 'src/services/product-display/product-display.service';

@Component({
  selector: 'app-product-interface',
  templateUrl: './product-interface.component.html',
  styleUrl: './product-interface.component.css'
})
 
export class ProductInterfaceComponent implements OnInit {
  products: any; 
  constructor(private route: ActivatedRoute, private api: ProductDisplayService) {}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    
    if (productId) { // Use productId instead of this.productId
      this.api.getProductsById(productId).subscribe((result) => {
        
        this.products = [result];
      });
    }
  }
}