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
      this.fetchCartData(id);
    }
  }

  fetchCartData(ownerId: string) {
    this.api.getCart(ownerId).subscribe(
      data => {
        this.cartData = data;
        this.calculateTotalAmount();
      },
      error => {
        console.error('Error fetching cart:', error);
      }
    );
  }
  

  calculateTotalAmount() {
    if (this.cartData && this.cartData.items) {
      this.totalAmount = this.cartData.items.reduce((total, item) => {
        return total + (item.productId.productPrice * item.quantity);
      }, 0);
    }
  }

  incrementQuantity(item) {
    item.quantity++;
    this.calculateTotalAmount();
  }
  
  decrementQuantity(item) {
    if (item.quantity > 1) {
      item.quantity--;
      this.calculateTotalAmount();
    }
  }

  removeCartProduct(ownerId: string, productId: string) {
    this.api.removeCartProduct(ownerId, productId)
    .subscribe({
      next:(res) => { 
        this.fetchCartData(ownerId);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  cartPayment() {
    
  }
}