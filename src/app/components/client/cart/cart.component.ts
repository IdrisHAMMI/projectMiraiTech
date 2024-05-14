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
  cartItems: any[] = [];
  totalAmount: number = 0;
  public payPalConfig ?: IPayPalConfig
  
  constructor(private api: CartService,
    private dialog: MatDialog
  ) {}


  ngOnInit(): void {
    this.initConfig();
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
        // CHECKS IF item.productId IS DEFINED BEFORE ACCESSING productPrice 
        if (item.productId && item.productId.productPrice) {
          return total + (item.productId.productPrice * item.quantity);
        } else {
          return total; // SKIP THE ITEM IF IT RETURNS UNDEFINED
        }
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
      // Map items to PayPal format
      const items = this.cartData.items.map((item) => ({
        name: item.productId.productName,
        productImageURL: item.productId.productImageURL,
        quantity: item.quantity,
        unit_amount: {
          currency_code: 'EUR', 
          value: item.productId.productPrice.toFixed(2)  //SINGLE PRICE VALUE
        }
      }));

      // CALCULATE ITEM TOAL
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
              value: itemTotal  // Correct item total
            }
          }
        },
        items: items
      }];
    
      // Create order request
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
      console.log('onApprove - transaction was approved byut not authorized', data, actions);
      actions.order.get().then(details => {
        console.log('onApprove - you can get full order details inside onApprove: ', details)
      })
    },
    onClientAuthorization: (authorization: IClientAuthorizeCallbackData) => {
      
      const ownerId = localStorage.getItem('UID'); //USER ID
      const items = authorization.purchase_units[0].items;
      const productName = authorization.purchase_units[0].items[0].name;// ACCESS ITEMS FROM AUTH DATA
      const productQuantity = authorization.purchase_units[0].items[0].quantity;
      const amount = authorization.purchase_units[0].amount.breakdown.item_total.value; // ACCESS AMOUNT FROM AUTH DATA
      const paypalTransactionId = authorization.id; // ACCESS THE TRANSACTION ID
      const transactionData = {ownerId: ownerId, name: productName, quantity:productQuantity, totalPrice: amount, paypalTransactionId: paypalTransactionId }; //TRANSACTION DATA
      
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
          // Handle any errors
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


