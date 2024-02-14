import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';


@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
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
        this.router.navigate(['index'])
      },
      error:(err) => {
        console.log(err);
      }
    })
  }
}
