import { ViewportService } from './../../../../services/viewport/viewport.service';
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
  searchQuery: string;
  
  isAdmin: boolean;

  isSmallScreen = false;
  
  constructor(private authService: AuthService,
    private viewportService: ViewportService,
    private cartApi: CartService,
    private router: Router
  ){
    this.viewportService.isSmallScreen$.subscribe(isSmallScreen => {
      this.isSmallScreen = isSmallScreen;
    });
 }

  
  ngOnInit(): void {
      this.authService.isLoggedIn$.subscribe(res => {
        this.isLoggedIn = this.authService.isLoggedIn();
      })
      this.cartApi.currentCartCount.subscribe(count => {
        this.cartCount = count;
      });
      //IF THE userState HEADER BOOLEAN IS TRUE THEN INIT
      this.isAdmin = localStorage.getItem('userState') === 'true';

  }
  //TOGGLES THE DROPDOWN ELEMENT IN HEADER
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  search() {
    console.log('Search query:', this.searchQuery);
    if (this.searchQuery && this.searchQuery.trim() !== '') {
      // Redirect to search component with query parameter
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery.trim() } });
    }
  }

  toggleSearchBar() {

  }

  //LOGOUT USER FUNCTION (Logs the user out by removing the UID header from the browser's localstorage)
  logout(){
    localStorage.removeItem("UID");
    localStorage.removeItem("userState");
    this.authService.isLoggedIn$.next(false);
    this.router.navigate(['/index']);
  }
}