import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.css'],
})
export class AuthSignupComponent implements OnInit{
  form:FormGroup

  constructor(
    private formBuilder:FormBuilder,
    private http:HttpClient,
    private router:Router
  ){}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      _id: "",
      username: "",
      email: "",
      password: "",
      date: new Date(),
    })
  }

  
  submit(): void{
    let Users = this.form.getRawValue()
    console.log(Users)

    if(Users.username == "" || Users.email == "" || Users.password == ""  ) {
      Swal.fire("Error", "Please enter all the fields", "error")
    }
    //else if(!this.ValidateEmail(Users.email)){
    //  Swal.fire("Error", "Please enter a valid email", "error")
    //  } 
    else {
      this.http.post("http://localhost:3000/api/register",Users, {
        withCredentials: true
      })
      .subscribe (() => this.router.navigate(['/']),(err) => {
        Swal.fire("Error",err.error.message,"error")
      })
    }
  }
}