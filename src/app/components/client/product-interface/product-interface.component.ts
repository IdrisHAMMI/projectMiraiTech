import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/services/cart/cart.service';
import { ProductDisplayService } from 'src/services/product-display/product-display.service';

@Component({
  selector: 'app-product-interface',
  templateUrl: './product-interface.component.html',
  styleUrl: './product-interface.component.css'
})
 
export class ProductInterfaceComponent implements OnInit {
  products: any; 
  
  constructor(private route: ActivatedRoute, 
    private cartApi: CartService,
    private router: Router,
    private productDisplayApi: ProductDisplayService,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    
    if (productId) { //IF PRODUCT ID IS PASSED THEN SUBSCRIBE TO API
      this.productDisplayApi.getProductsById(productId).subscribe((result) => {
        this.products = [result];
      });
    }
  }

  addToCart(productId: string) {
    const ownerId = sessionStorage.getItem('UID');
    if (!ownerId) {
      this.router.navigate(['authLogin']),
      console.error('Owner ID not found in local storage');
      return; //EXIT EARLY IF THE USER ID IS NOT FOUND
    }

    this.cartApi.addToCart(productId, ownerId).subscribe(
    (res) => {
      console.log('Product added to cart:', res);
      this.snackBar.open('Produit ajouté dans votre Panier.', 'Fermer', {
        duration: 3000,
      });
    },
    (error) => {
      console.error('Error adding product to cart:', error);
    }
  );
 }
}

