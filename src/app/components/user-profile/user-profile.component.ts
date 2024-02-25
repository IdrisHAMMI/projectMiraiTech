import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{

  username: string | undefined;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const id = localStorage.getItem('UID');
    if (id) {
      this.userService.getUsernameById(id).subscribe(
        data => {
          this.username = data.username;
        },
        error => {
          console.error('Error fetching username:', error);
        }
      );
    }
  }
}