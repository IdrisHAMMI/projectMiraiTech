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

  ValidateEmail = (email:any) => {

    //REGULAR EXPRESSION MATCHING FOR EMAIL
    var validRegex = /^[a-zA-Z0-9.!#$%'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(email.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  }

  submit():void{
    let user = this.form.getRawValue()
    console.log(user)

    //IF CREDENTIALS = NULL || EMAIL ALREADY USED, THROW ERROR.
    //ELSE, POST THE ENTERED CREDENTIALS TO SERVER AND REDIRECT
    //USER TO THE INDEX
    if(user.username == "" || user.email == "" || user.password == "") {
      Swal.fire("Error","Fill the Fields.", "error")
    } else if(!this.ValidateEmail(user.email)){
      Swal.fire("Error", "Enter a valid Email","error")
    }else{
      this.http.post("http://localhost:3000/api/register", user, {
        withCredentials: true
      })
      .subscribe(
        () => {
          Swal.fire("Success", "Registration successful! You can now log in to your account.", "success");
          this.router.navigate(['/']); // Navigate on success
        },
        (err) => {
          Swal.fire("Error", err.error.message, "error");
        }
      );
      }
    }
  }
