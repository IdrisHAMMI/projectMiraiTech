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
  selectedFile: File | undefined;

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
        productImageURL: ['']
      });
    }
  
    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
    }
  
    addProduct() {
      const formData = new FormData();
      formData.append('productName', this.productForm.get('productName')!.value);
      formData.append('productDescription', this.productForm.get('productDescription')!.value);
      formData.append('productStock', this.productForm.get('productStock')!.value);
      formData.append('productBrand', this.productForm.get('productBrand')!.value);
      formData.append('productPrice', this.productForm.get('productPrice')!.value);
      
    // CHECK IF A FILE HAS BEEN SELECTED
      if (this.selectedFile) {
        formData.append('productImageURL', this.selectedFile);
      }


      this.api.createProduct(formData)
        .subscribe({
          next: (res) => {
            this.snackBar.open('Produit Ajouté!', 'Fermer', { duration: 2000 });
          },
          error: (err) => {
            console.log(err);
          }
        });
    }
  }