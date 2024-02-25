import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { confirmPasswordValidator } from 'src/validators/authValidator';
import { AuthService } from 'src/services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth-signup',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.css'],
})
export class AuthSignupComponent implements OnInit {
  registerForm: FormGroup;
  authService = inject(AuthService)
  router = inject(Router);
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    {
      validator: confirmPasswordValidator('password', 'confirmPassword')
    }
    );
  }

  register() {
    this.authService.registerService(this.registerForm.value)
    .subscribe({
      next:(res)=>{
      this.router.navigate(['index']);
      //  alert("User Created")
    },
    error:(err)=> {
      console.log(err)
    }})
  }
}
