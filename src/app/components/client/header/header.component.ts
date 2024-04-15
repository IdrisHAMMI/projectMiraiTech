import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit { 
  
  isLoggedIn: boolean = false;
  isDropdownOpen: boolean = false;
  productState: number = 0;

  constructor(private authService: AuthService,
    private route: Router
  ){}

  
  ngOnInit(): void {
      this.authService.isLoggedIn$.subscribe(res => {
        this.isLoggedIn = this.authService.isLoggedIn();
      })
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(){
    localStorage.removeItem("UID");
    this.authService.isLoggedIn$.next(false);
  }

}
