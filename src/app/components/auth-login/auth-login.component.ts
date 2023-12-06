import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    let Users = this.form.getRawValue()
    console.log(Users)

    if (Users.email == "" || Users.password == "" ) {
      Swal.fire('Error', 'Fields are empty', 'error');
    } else {
      this.http.post("http://localhost:3000/api/login", Users, {
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
