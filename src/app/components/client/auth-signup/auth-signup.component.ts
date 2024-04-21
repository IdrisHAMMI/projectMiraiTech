import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { confirmPasswordValidator } from 'src/validators/authValidator';
import { AuthService } from 'src/services/auth/auth.service';
import { Router } from '@angular/router';
import { PatternValidatorsService } from './../../../../services/pattern-validator/pattern-validators.service';
import { StrongPasswordRegx } from './regex-password';


@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.css'],
})
export class AuthSignupComponent implements OnInit {
  registerForm: FormGroup;
  
  constructor(private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['',
        Validators.compose([
          Validators.required,
          PatternValidatorsService.patternValidators(/\d/, {hasNumber:true}),
          PatternValidatorsService.patternValidators(/[A-Z]/, {hasCapitalCase:true}),
          PatternValidatorsService.patternValidators(/[a-z]/, {hasSmallCase:true}),
          PatternValidatorsService.patternValidators(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {hasSpecialCharacters:true}
        ),
        Validators.minLength(8),
        ])
       ],
      confirmPassword: ['', Validators.required],
    },
    {
      validator: confirmPasswordValidator('password', 'confirmPassword')
    }
    );

  }

  get password() {
    return this.registerForm.get('password');
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
