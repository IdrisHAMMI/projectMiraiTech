import { Component, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShipdeetsModalComponent } from '../shipdeets-modal/shipdeets-modal.component';

@Component({
  selector: 'app-user-profile-addresses',
  templateUrl: './user-profile-addresses.component.html',
  styleUrl: './user-profile-addresses.component.css'
})
export class UserProfileAddressesComponent {

    constructor (private dialog: MatDialog) {}

    openForm(){
      this.dialog.open(ShipdeetsModalComponent, {
        width: '60%',
        height: '800px'
      })
    }
}
