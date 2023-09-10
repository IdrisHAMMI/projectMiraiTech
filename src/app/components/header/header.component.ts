import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emitters } from 'src/app/emitters/emitter';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authenticated = false;
  message: string = "";

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
      if (auth) {
        this.http.get('http://localhost:3000/api/user', { withCredentials: true })
          .subscribe(
            (res: any) => {
              this.message = `Welcome ${res.username}!`;
            }
          );
      } else {
        this.message = "Signup/Login";
      }
    });
  }

  logout(): void {
    this.http.post('http://localhost:3000/api/logout', {}, { withCredentials: true })
      .subscribe(() => {
        Emitters.authEmitter.emit(false); //EMIT EVENT TO UPDATE AUTH STATUS
        this.message = 'Signup/Login'; //RESET USER ID MSG
      });
  }
}
