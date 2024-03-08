import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/user/user.service';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-shipdeets-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './shipdeets-modal.component.html',
  styleUrl: './shipdeets-modal.component.css'
})
export class ShipdeetsModalComponent implements OnInit {

  userShippingForm: FormGroup;
  userService = inject(UserService);
  private dialogRef:MatDialogRef<ShipdeetsModalComponent>;
  uid: string;
  
  constructor(private ref:MatDialogRef<ShipdeetsModalComponent>, private fb: FormBuilder){}

  ngOnInit(): void {
    this.uid = localStorage.getItem('UID');
    if (!this.uid) {
      console.error('UID not found in local storage');
    }
    this.userShippingForm = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      roadAddress: ['', Validators.required],
      additionalAddress: ['', Validators.required],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    })
  }

  addShipping() {
    // PREPARE HEADER WITH UID
    const headers = new HttpHeaders().set('UID', this.uid);

    // SENDS SHIPPING FORM DATA TO COLLECTION
    this.userService.createShippingAddress({ ...this.userShippingForm.value, headers })
      .subscribe({
        next:(res)=>{
          alert("Added Shipping details in user's db");
        },
        error:(err)=> {
          console.log(err);
        }
      });
  }
  closepopup(){
    this.ref.close();
  }
}
