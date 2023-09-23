import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Emitters } from 'src/app/emitters/emitter';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  username: string = "";

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:3000/api/user', {
      withCredentials: true
    })
    .subscribe(
      (res: any) => {
      this.username = `${res.username}`;
      Emitters.authEmitter.emit(true);
      }
    )
  }

}
