import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emitters } from '../../emiters/emitter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  authenticated = false;
  message: string = "";
  username: string = "";
  email: string = ""; //TO BE ADDED

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });

    this.http.get(`http://localhost:3000/users`, {
      withCredentials: true,

    }).subscribe(
      (res: any) => {
        this.username = res.username;
        Emitters.authEmitter.emit(true);
      },
      (err) => {
        this.router.navigateByUrl('/index');      
        Emitters.authEmitter.emit(false);
      }
    );
  }
}
