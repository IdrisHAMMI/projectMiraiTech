import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit { 
  authService = inject(AuthService);
  isLoggedIn: boolean = false;

  username: string;

  ngOnInit(): void {
      this.authService.isLoggedIn$.subscribe(res => {
        this.isLoggedIn = this.authService.isLoggedIn();
      })
  }

  logout(){
    localStorage.removeItem("UID");
    this.authService.isLoggedIn$.next(false);
  }
}
