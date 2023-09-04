import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  message: string = "";

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:3000/api/user', {
      withCredentials: true
    })
    .subscribe(
      (res: any) => {
        this.message = `wtf hello ${res.username}???`;
      },
      err => {
        this.message = 'aw...still dont work...';
      }
    );
  }
}

