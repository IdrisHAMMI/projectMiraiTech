import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { AdminPanelService } from './../../../../services/admin/adminpanel.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrl: './add-product-modal.component.css'
})
export class AddProductModalComponent implements OnInit {

  productForm !: FormGroup;

  constructor(private formBuilder : FormBuilder,
     private api : AdminPanelService,
     private snackBar: MatSnackBar,
     @Inject(MAT_DIALOG_DATA) public editData: any,
     private dialogRef : MatDialogRef<AddProductModalComponent>){}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productDescription: ['', Validators.required],
      productStock: ['', Validators.required],
      productBrand: ['', Validators.required],
      productPrice: ['', Validators.required],
    });
   
  //  if(this.editData) {
  //    this.actionButton = "Update"
  //    this.productForm.controls['productName'].setValue(this.editData.productName);
  //    this.productForm.controls['productDescription'].setValue(this.editData.productDescription);
  //    this.productForm.controls['productStock'].setValue(this.editData.productStock);
  //    this.productForm.controls['productBrand'].setValue(this.editData.productBrand);
  //    this.productForm.controls['productPrice'].setValue(this.editData.productPrice);
//
  //  }
  }

  addProduct(){
    this.api.createProduct(this.productForm.value)
    .subscribe({
      next:(res)=> {
        alert("Creation success!")
      },
      error:(err)=> {
        console.log(err)
      }
    })
  }
 }
