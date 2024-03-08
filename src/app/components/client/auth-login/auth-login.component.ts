import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';


@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  loginForm !: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group ({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    })
  }
  login(){
    this.authService.loginService(this.loginForm.value)
    .subscribe({
      next:(res)=>{
        localStorage.setItem("UID", res.data._id);
        this.authService.isLoggedIn$.next(true);
        this.router.navigate(['index']);
      },
      error:(err) => {
        console.log(err);
      }
    })
  }
}