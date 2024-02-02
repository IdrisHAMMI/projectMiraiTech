import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getUserBySessionToken } from '../../../../models/users.model'
import { Emitters } from '../../emiters/emitter';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  authenticated = false;
  message: string = "";
  username: string = "";

  constructor(private http: HttpClient) {}

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
        this.message = "You are not logged in";
        Emitters.authEmitter.emit(false);
      }
    );
  }


  logout(): void {
    console.log('Logout method called');
    this.http.post('http://localhost:3000/auth/logout', {}, { withCredentials: true })
      .subscribe(
        () => {
          console.log('Logout successful');
          Emitters.authEmitter.emit(false);
        },
        (error) => {
          console.error('Logout error:', error);
        }
      );
  }
}
