import { ITransactionSchema  } from './../../../../../models/transaction.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest, IClientAuthorizeCallbackData } from 'ngx-paypal';

import { environment } from './../../../../../environment/environment';
import { PaymentSuccessComponent } from '../payment-success/payment-success.component';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from 'src/services/cart/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent implements OnInit {
  
  cartData: any;
  totalAmount: number = 0;
  public payPalConfig ?: IPayPalConfig
  
  constructor(private api: CartService,
    private dialog: MatDialog
  ) {}


  ngOnInit(): void {
    this.initConfig();
    const id = sessionStorage.getItem('UID');
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
        // CHECKS IF item.productId IS DEFINED BEFORE ACCESSING productPrice 
        if (item.productId && item.productId.productPrice) {
          return total + (item.productId.productPrice * item.quantity);
        } else {
          return total; // SKIP THE ITEM IF IT RETURNS UNDEFINED
        }
      }, 0);
    }
  }

  incrementQuantity(item, productId: string) {
    item.quantity++;
    this.calculateTotalAmount();
    this.updateCartQty(item,productId);
  }
  
  decrementQuantity(item, productId: string) {
    if (item.quantity > 1) {
      item.quantity--;
      this.calculateTotalAmount()
      this.updateCartQty(item,productId);
    }
  }

  updateCartQty(item, productId: string) {
    const ownerId = sessionStorage.getItem('UID');
    this.api.updateCartQty(item.quantity, ownerId, productId)
      .subscribe({
        next: (res) => {
          console.log('Cart item updated successfully:', res);
          
        },
        error: (error) => {
          console.error('Error updating cart item:', error);
        }
      });
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

  removeAllCartProducts(ownerId: string) {
    this.api.removeAllCartProduct(ownerId)
    .subscribe({
      next:(res) => { 
        this.fetchCartData(ownerId);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  
//PAYPAL INIT CONFIG 
private initConfig(): void {
  this.payPalConfig = {
    clientId: environment.PAYPAL_CLIENT_ID,
    currency: 'EUR',
    createOrderOnClient: (data) => {
      const items = this.cartData.items.map((item) => ({
        name: item.productId.productName,
        productImageURL: item.productId.productImageURL,
        quantity: item.quantity,
        unit_amount: {
          currency_code: 'EUR', 
          value: item.productId.productPrice.toFixed(2)  //SINGLE PRICE VALUE
        }
      }));

      // CALCULATE ITEM TOTAL
      const itemTotal = this.cartData.items.reduce((sum, item) => 
        sum + (item.productId.productPrice * item.quantity), 0
      ).toFixed(2);

      const purchaseUnits = [{
        reference_id: 'default',
        amount: {
          currency_code: 'EUR',
          value: itemTotal,
          breakdown: {
            item_total: {
              currency_code: 'EUR',
              value: itemTotal
            }
          }
        },
        items: items
      }];
    
      const order: ICreateOrderRequest = {
        intent: 'CAPTURE',
        purchase_units: purchaseUnits
      };
    
      return order;
    },

    advanced: {
      commit: 'true',
      
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved but not authorized', data, actions);
      actions.order.get().then(details => {
        console.log('onApprove - you can get full order details inside onApprove: ', details)
      })
    },

    onClientAuthorization: (authorization: IClientAuthorizeCallbackData) => {
      const ownerId = sessionStorage.getItem('UID'); //USER ID
      const items = authorization.purchase_units[0].items;// ACCESS ITEMS FROM AUTH DATA
      const productName = authorization.purchase_units[0].items[0].name; //ACCESS PRODUCT NAME
      const productQuantity = authorization.purchase_units[0].items[0].quantity; //ACCESS PRODUCT QUANTITY
      const amount = authorization.purchase_units[0].amount.breakdown.item_total.value; // ACCESS AMOUNT FROM AUTH DATA
      const paypalTransactionId = authorization.id; // ACCESS THE TRANSACTION ID
      const transactionData = {ownerId: ownerId, 
        name: productName, 
        quantity:productQuantity, 
        totalPrice: amount, 
        paypalTransactionId: paypalTransactionId 
      }; //TRANSACTION DATA
      
      const dialogRef = this.dialog.open(PaymentSuccessComponent, {
        width: '60%',
        height: '720px',
        data: { items: items, totalPrice: amount, paypalTransactionId: paypalTransactionId }, //TRANSACTION DATA FOR MODAL
      });
      
      this.api.sendTransactionInfo(ownerId, transactionData).subscribe(
        (res: ITransactionSchema[]) => {
          this.removeAllCartProducts(ownerId);
          console.log('Transaction info sent successfully:', res);
        },
        (error) => {
          console.error('Error sending transaction info:', error);
        }
      );
    },
    
    onCancel: (data, actions) => {
      // Handle cancellation
    },
    onError: (err) => {
      // Handle errors
    },
    onClick: (data) => {
      console.log(data)
    }
    
  };
 }
}


