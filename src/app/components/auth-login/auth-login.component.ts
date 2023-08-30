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

  async onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      const credentials = loginForm.value;

      // Hash the password using bcrypt


      // Send the hashed password in the request
      const loginData = {
        username: credentials.username,
        password: credentials.password // Send the hashed password
      };

      this.authService.login(loginData).subscribe(
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
