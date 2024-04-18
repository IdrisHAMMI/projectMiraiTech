import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{

  userDetails: any;
  userForm: FormGroup;

  constructor(private api: UserService, 
    private formBuilder : FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router) { }
    
  ngOnInit(): void {
    this.fetchUserDetails(this.userDetails);

    this.userForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  editEmail() {
    const UID = localStorage.getItem('UID');
    this.api.updateUserEmailProfile(UID, this.userForm.value)
    .subscribe({
      next:(res) => {
        this.snackBar.open('Email modifié!', 'Fermer', {duration: 2000});
        this.fetchUserDetails(this.userDetails)
      }
    })
  }

  fetchUserDetails(id: string) {
    const UID = localStorage.getItem('UID');
    this.api.getUserDetails(UID).subscribe((result)=>{
      this.userDetails = result;
    }
    )
  }

  logout(){
    localStorage.removeItem("UID");
    this.router.navigate(['/index']);
  }

}