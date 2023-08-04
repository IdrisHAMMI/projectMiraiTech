import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UsersService } from '../../shared/users.service';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.css'],
  providers: [UsersService]
})
export class AuthSignupComponent {

  constructor(public usersService: UsersService) {}

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form)
    form.reset();
    this.usersService.selectedUsers = {
      _id: "",
      username: "",
      email: "",
      password: "",
    }
  }

}

