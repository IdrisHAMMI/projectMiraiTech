import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {
  forgetForm !: FormGroup;
  authService = inject(AuthService)
  fb = inject(FormBuilder);

  ngOnInit(): void{
    this.forgetForm = this.fb.group ({
      email: ['',Validators.compose([Validators.required, Validators.email])]
    })
  }
  submit(){
    this.authService.sendEmailService(this.forgetForm.value.email)
    .subscribe({
      next: (res)=>{
        alert(res.message);
        this.forgetForm.reset();
      },
      error: (err)=>{
        alert(err.error.message)
      }
    })
  }
}
