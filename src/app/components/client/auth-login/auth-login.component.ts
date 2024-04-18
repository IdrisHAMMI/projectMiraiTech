import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';


@Component({
  selector: 'app-auth-login',
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
        const isAdmin = res.data.roles._id === '65c65ab9c513c27b855b720a';
        localStorage.setItem("UID", res.data._id); //SETS USER ID 
        localStorage.setItem("userState", isAdmin.toString());//SETS ADMIN BOOLEAN (if true show admin panel, if not show basic user settings)
        this.authService.isLoggedIn$.next(true);
        this.router.navigate(['index']);
      },
      error:(err) => {
        console.log(err);
      }
    })
  }
}