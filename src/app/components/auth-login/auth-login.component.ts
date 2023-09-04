import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private http:HttpClient,
    private router:Router
  ) {}


  ValidateEmail = (email:any) => {

    //REGULAR EXPRESSION MATCHING FOR EMAIL
    var validRegex = /^[a-zA-Z0-9.!#$%'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(email.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  }
  ngOnInit(): void {
    this.form= this.formBuilder.group({
      email: '',
      password:'',
    });
}

  submit():void{
    let user = this.form.getRawValue()
    console.log(user)

    if(user.username == "" || user.password == "") {
      Swal.fire("Error","Fill the Fields.", "error")
    } else if(!this.ValidateEmail(user.email)){
      Swal.fire("Error", "Enter a valid Email","error")
    }else{
      this.http.post("http://localhost:3000/api/login", user, {
        withCredentials: true
      })
      .subscribe(
        (res) => this.router.navigate(['/']),
        (err) => {
          Swal.fire("Error", err.error.message, "error")
        }
      )
  }
 }
}
