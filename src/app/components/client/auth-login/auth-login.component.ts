import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';


@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService, 
    private snackBar: MatSnackBar,
    private router: Router) {}

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
        //isAdmin needs to be revised asap. TEMP SOLUTION UNTIL I FIND SOMETHING MORE SECURE
        const isAdmin = res.data.roles._id === '65c65ab9c513c27b855b720a';
        
        //SETS ADMIN BOOLEAN (if true show admin panel, if not show basic user settings)
        sessionStorage.setItem("userState", isAdmin.toString()); 
        
        this.authService.isLoggedIn$.next(true);

        sessionStorage.setItem("UID", res.data._id); //SETS USER ID
        
        this.router.navigate(['index']);
      },
      error:(err) => {
        this.snackBar.open('Email ou Mot de passe non trouvé.', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    })
  }
}

