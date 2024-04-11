import { Component, OnInit } from '@angular/core';
import { ProductDisplayService } from 'src/services/product-display/product-display.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent implements OnInit {
  cartData: any;
  totalAmount: number = 0;
  constructor(private api: ProductDisplayService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const id = localStorage.getItem('UID');
    if (id) {
       this.api.getCart(id).subscribe(
         data => {
           this.cartData = data;
           this.calculateTotalAmount();
         },
         error => {
           console.error('Error fetching cart:', error);
         }
       );
    }
  }

  incrementQuantity(product: any) {
    product.quantity++; // Increment quantity locally
  }
  
  calculateTotalAmount() {
    this.totalAmount = 0; //RESET "TOTALAMOUNT" BEFORE RECALCULATING
    // ITERATE OVER "CARTDATA" AND SUM UP THE PRODUCT PRICES
    for (let cartItem of this.cartData) {
      for (let product of cartItem.productId) {
        this.totalAmount += product.productPrice;
      }
    }
    console.log('Total Amount:', this.totalAmount); // Add this line for debugging
  }

  cartPayment() {
    
  }
}