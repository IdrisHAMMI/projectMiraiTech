import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShipdeetsModalComponent } from '../shipdeets-modal/shipdeets-modal.component';
import { UserService } from 'src/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-addresses',
  templateUrl: './user-profile-addresses.component.html',
  styleUrl: './user-profile-addresses.component.css'
})
export class UserProfileAddressesComponent implements OnInit{

  userAddress: any;
  
  
  constructor (private dialog: MatDialog, 
    private api: UserService,
    private router: Router) {}

  ngOnInit(): void {
      this.fetchUserDetails(this.userAddress);
  }

  fetchUserDetails(id: string) {
    const UID = sessionStorage.getItem('UID');
    this.api.getUserDetails(UID).subscribe((result)=>{
      this.userAddress = result;
    }
    )
  }
  
  logout(){
    sessionStorage.removeItem("UID");
    this.router.navigate(['/index']);
  }

    openForm(){
      this.dialog.open(ShipdeetsModalComponent, {
        width: '60%',
        height: '800px'
      })
    }
}
