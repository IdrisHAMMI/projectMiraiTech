import { ITransactionSchema } from './../../../models/transaction.model';
import { Injectable } from '@angular/core';
import { ICartModel } from './../../../models/cart.model';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../apiUrl';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private cartItems: any[] = [];
  private cartCountSource = new BehaviorSubject<number>(0);
  currentCartCount = this.cartCountSource.asObservable();

  constructor(private http: HttpClient) {
    const savedCartCount = localStorage.getItem('cartCount');
    if (savedCartCount) {
       this.cartCountSource.next(JSON.parse(savedCartCount));
    }
   }


  //ADDS PRODUCT DATA TO THE CART COLLECTION ()
  addToCart(productId: string, ownerId: string): Observable<ICartModel[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const existingItem = this.cartItems.find(item => item.productId === productId);
     if (existingItem) {
        // INCREMENT THE QUANTITY OF THE EXISTING ITEM 
        existingItem.quantity += 0;
     } else {
        // ADD A NEW ITEM TO THE CART
        this.cartItems.push({ productId, ownerId, quantity: 1 });
     }
     this.updateCartCount(1); // UPDATE THE CART COUNT IN addToCart
     return this.http.post<ICartModel[]>(`${apiUrl.cartServiceApi}add/${productId}`, { ownerId, productId }, { headers })
   }

  //GETS CART DATA
  getCart(ownerId: string): Observable<ICartModel[]> {
    return this.http.get<ICartModel[]>(`${apiUrl.cartServiceApi}get/${ownerId}`)
  }

  //REMOVES PRODUCT DATA FROM THE CART
  removeCartProduct(ownerId: string, productId: string): Observable<ICartModel[]> {
    this.updateCartCount(-1);
    return this.http.delete<ICartModel[]>(`${apiUrl.cartServiceApi}${ownerId}/delete/${productId}`)
   } 

   //REMOVES ALL DATA FROM THE CART
   removeAllCartProduct(ownerId: string): Observable<ICartModel[]> {
    return this.http.delete<ICartModel[]>(`${apiUrl.cartServiceApi}delete/all/${ownerId}`).pipe(
      tap(() => {
        this.updateCartCount(0);
      })
    )
   } 

   //UPDATES CART COUNT
   updateCartCount(increment: number) {
    const currentCount = this.cartCountSource.getValue();
    this.cartCountSource.next(currentCount + increment);
 } 
  
  sendTransactionInfo(ownerId: string, transactionData: any): Observable<ITransactionSchema[]> {
    return this.http.post<ITransactionSchema[]>(`${apiUrl.cartServiceApi}transaction/success/post/${ownerId}`, transactionData)
  }

}
