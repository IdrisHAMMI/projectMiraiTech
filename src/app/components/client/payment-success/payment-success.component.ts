import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent {

  @Input() amount;
  @Input() items;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) {}
 
  ngOnInit(): void {
    console.log('Items:', this.data.items);
    console.log('Amount:', this.data.amount);
  }
}