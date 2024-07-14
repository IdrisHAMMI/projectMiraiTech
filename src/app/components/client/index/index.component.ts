import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../../../services/product/product.service';
import { ProductDisplayService } from 'src/services/product-display/product-display.service';
import { Router } from '@angular/router';
import { CartService } from 'src/services/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
  
  products: any;
  
  constructor(private productService: ProductService,
    private productDisplayApi: ProductDisplayService,
    private cartApi: CartService,
    private snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
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

  onProductClick(product: any) {
    this.productDisplayApi.selectedProduct = product;
  }

}

