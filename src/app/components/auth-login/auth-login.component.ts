import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

interface UserLogin {
  username: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: "",
      password: "",
    });
  }

  submit(): void {
    const user: UserLogin = this.form.getRawValue()
    console.log(user)

    if (user.email == "" || user.password == "" ) {
      Swal.fire('Error', 'Fields are empty', 'error');
    } else {
      this.http.post("http://localhost:3000/auth/login", user, {
        withCredentials: true
      })
      .subscribe(
        (res) => this.router.navigate(['/']),
        (err) => {
          Swal.fire('Error', err.error.message, 'error');
        }
      );
    }
  }
}
