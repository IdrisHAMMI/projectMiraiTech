import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent {
  constructor(private authService: AuthService) {}

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      const credentials = loginForm.value;
      this.authService.login(credentials).subscribe(
        (response) => {
          // Handle successful login
          const token = response.token;
          // Save token to local storage or other storage method
        },
        (error) => {
          // Handle login error
        }
      );
    }
  }
}
