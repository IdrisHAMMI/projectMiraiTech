import { ITransactionSchema } from './../../../models/transaction.model';
import { Injectable } from '@angular/core';
import { ICartModel } from './../../../models/cart.model';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../apiUrl';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private cartItems: any[] = [];

  constructor(private http: HttpClient) {}


  //ADDS PRODUCT DATA TO THE CART COLLECTION
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
     return this.http.post<ICartModel[]>(`${apiUrl.cartServiceApi}add/${productId}`, { ownerId, productId }, { headers })
   }

  //GETS CART DATA
  getCart(ownerId: string): Observable<ICartModel[]> {
    return this.http.get<ICartModel[]>(`${apiUrl.cartServiceApi}get/${ownerId}`)
  }

  //REMOVES PRODUCT DATA FROM THE CART
  removeCartProduct(ownerId: string, productId: string): Observable<ICartModel[]> {
    return this.http.delete<ICartModel[]>(`${apiUrl.cartServiceApi}${ownerId}/delete/${productId}`)
   } 

   //REMOVES ALL DATA FROM THE CART
   removeAllCartProduct(ownerId: string): Observable<ICartModel[]> {
    return this.http.delete<ICartModel[]>(`${apiUrl.cartServiceApi}delete/all/${ownerId}`)
   } 

   getCartCount(ownerId: string): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${apiUrl.cartServiceApi}count/get/${ownerId}`)
   }

  //UPDATES CART QUANTITY
   updateCartQty(quantity: number, ownerId: string, productId: string): Observable<ICartModel[]> {
    const url = `${apiUrl.cartServiceApi}cartQty/update/${ownerId}/${productId}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({ quantity }); // SET QUANTITY AS JSON OBJECT
    return this.http.put<ICartModel[]>(url, body, { headers });
  }

  sendTransactionInfo(ownerId: string, transactionData: any): Observable<ITransactionSchema[]> {
    return this.http.post<ITransactionSchema[]>(`${apiUrl.cartServiceApi}transaction/success/post/${ownerId}`, transactionData)
  }
}
