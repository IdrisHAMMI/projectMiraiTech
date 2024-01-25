import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

interface User {
  username: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.css'],
})
export class AuthSignupComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      email: '',
      password: '',
    });
  }

  submit(): void {
    const user: User = this.form.getRawValue();

    if (!user.username || !user.email || !user.password) {
      Swal.fire('Error', 'Please enter all the fields', 'error');
    } else {
      this.http.post('http://localhost:3000/auth/register', user, {
        withCredentials: true,
      })
      .subscribe(
        () => this.router.navigate(['/']),
        (err) => Swal.fire('Error', err.error.message, 'error')
      );
    }
  }
}
