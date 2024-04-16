import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';
import { CartService } from 'src/services/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit { 
  
  isLoggedIn: boolean = false;
  isDropdownOpen: boolean = false;
  cartCount: number = 0;

  constructor(private authService: AuthService,
    private cartApi: CartService,
    private router: Router
  ){}

  
  ngOnInit(): void {
      this.authService.isLoggedIn$.subscribe(res => {
        this.isLoggedIn = this.authService.isLoggedIn();
      })
      this.cartApi.currentCartCount.subscribe(count => {
        this.cartCount = count;
      });
  }
  //TOGGLES THE DROPDOWN ELEMENT IN HEADER
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  //LOGOUT USER FUNCTION (Logs the user out by removing the UID header from the browser's localstorage)
  logout(){
    localStorage.removeItem("UID");
    this.authService.isLoggedIn$.next(false);
    this.router.navigate(['/index']);
  }
}
