import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-user-profile-orders',
  templateUrl: './user-profile-orders.component.html',
  styleUrl: './user-profile-orders.component.css'
})
export class UserProfileOrdersComponent implements OnInit{

userDetails: any;
transactionData: any;
  
  constructor(private api: UserService, 
    private router: Router) { }
  
  ngOnInit(): void {
    this.fetchUserDetails(this.userDetails);
    this.fetchTransaction(this.transactionData);
  }

  //GET TRANSACTION DATA
  fetchTransaction(id: string) {
    const UID = sessionStorage.getItem('UID')
    this.api.getTransactionById(UID).subscribe((result)=> {
      this.transactionData = result
    })
  }

  //GET USER DATA
  fetchUserDetails(id: string) {
    const UID = sessionStorage.getItem('UID');
    this.api.getUserDetails(UID).subscribe((result)=>{
      this.userDetails = result;
    }
    )
  }

  //LOGOUT FUNCTION
  logout(){
    sessionStorage.removeItem("UID");
    sessionStorage.removeItem("userState");
    this.router.navigate(['/index']);
  }
}
