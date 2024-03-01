import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-shipdeets-modal',
  standalone: true,
  imports: [],
  templateUrl: './shipdeets-modal.component.html',
  styleUrl: './shipdeets-modal.component.css'
})
export class ShipdeetsModalComponent {

  constructor(private ref:MatDialogRef<ShipdeetsModalComponent>){

  }

  closepopup(){
    this.ref.close();
  }
}
