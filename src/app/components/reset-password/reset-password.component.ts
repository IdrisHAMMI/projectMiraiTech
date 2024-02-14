import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { confirmPasswordValidator } from 'src/validators/authValidator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router)
  authService = inject(AuthService);
  token!: string;

  

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    {
      validator: confirmPasswordValidator('password', 'confirmPassword')
    });

    this.activatedRoute.params.subscribe(val => {
      this.token = val['token'];
      console.log('Token:', this.token);
    });
  }

  reset() {
    let resetObj = {
      token: this.token,
      password: this.resetForm.value.password
    };
    this.authService.resetPasswordService(resetObj).subscribe({
      next: res => {
        alert(res.message);
        this.resetForm.reset();
        this.router.navigate(['login']);
      },
      error: err => {
        alert(err.error.message);
      }
    });
  }
}
