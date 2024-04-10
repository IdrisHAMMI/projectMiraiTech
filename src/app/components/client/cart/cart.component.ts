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

  constructor(private api: ProductDisplayService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const id = localStorage.getItem('UID');
    if (id) {
       this.api.getCart(id).subscribe(
         data => {
           this.cartData = data;
           console.log('Cart Data:', this.cartData); // Add this line to log the received data
         },
         error => {
           console.error('Error fetching cart:', error);
         }
       );
    }
  }

  cartPayment() {
    // Your cart payment logic
  }
}