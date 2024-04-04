import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    
    if (productId) { //IF PRODUCT ID IS PASSED THEN SUBSCRIBE TO API
      this.api.getProductsById(productId).subscribe((result) => {
        this.products = [result];
      });
    }
  }
}