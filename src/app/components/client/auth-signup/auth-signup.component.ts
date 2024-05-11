import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { confirmPasswordValidator } from 'src/validators/authValidator';
import { AuthService } from 'src/services/auth/auth.service';
import { Router } from '@angular/router';
import { PatternValidatorsService } from './../../../../services/pattern-validator/pattern-validators.service';


@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.css'],
})
export class AuthSignupComponent implements OnInit {
  // HOLDS THE USER REGISTRATION FORM 
  registerForm: FormGroup;
  
  //INJECTS DEPENDENCIES
  constructor(private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
  ) {}

  //INITIALIZES COMPONENT LOGIC
  ngOnInit(): void {
    //INIT FormBuilder FOR 'username', 'email' & 'password'
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['',

      // VALIDATES REGEX PASSWORD PATTERNS
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
      // VALIDATES IF THE PASSWORDS ARE THE SAME
      validator: confirmPasswordValidator('password', 'confirmPassword')
    }
    );
  }
  
  //RETURNS THE PASSWORD FORM CONTROL FROM registerForm 
  get password() {
    return this.registerForm.get('password');
  }

  //USER REGISTRATION API CALL
  register() {
    this.authService.registerService(this.registerForm.value)
    .subscribe({
      next:(res)=>{
      this.router.navigate(['index']);
    },
    error:(err)=> {
      console.log(err)
    }})
  }
}

