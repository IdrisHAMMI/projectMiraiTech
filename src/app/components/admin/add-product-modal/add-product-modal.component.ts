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
  }

  addProduct(){
    this.api.createProduct(this.productForm.value)
    .subscribe({
      next:(res)=> {
        this.snackBar.open('Produit Ajouté!', 'Fermer', {duration: 2000});
      },
      error:(err)=> {
        console.log(err)
      }
    })
  }
 }
