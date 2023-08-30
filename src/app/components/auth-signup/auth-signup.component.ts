import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.css'],
})
export class AuthSignupComponent implements OnInit{
  form: FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private http:HttpClient,
    private router:Router
  ) {}

  ngOnInit():void {
    this.form = this.formBuilder.group({
      username:"",
      email:"",
      password:""
    })
  }

  submit():void{
    let user = this.form.getRawValue()
    console.log(user)

    if(user.username == "" || user.email == "" || user.password == "") {
      Swal.fire("Error","Fill the Fields.", "error")
    }
  }
}
