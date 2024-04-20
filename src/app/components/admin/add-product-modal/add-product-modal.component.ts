import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { AdminPanelService } from './../../../../services/admin/adminpanel.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrl: './add-product-modal.component.css'
})
export class AddProductModalComponent implements OnInit {

  productForm !: FormGroup;
  selectedFile: File | undefined;
  brandName: any;
  categoryName: any;

  constructor(private formBuilder : FormBuilder,
     private api : AdminPanelService,
     private snackBar: MatSnackBar,
     private ref: MatDialogRef<AddProductModalComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any) {}

     //INIT PRODUCT FORM & API
     ngOnInit(): void {
      this.productForm = this.formBuilder.group({
        productName: ['', Validators.required],
        productDescription: ['', Validators.required],
        productStock: ['', Validators.required],
        productBrand: ['', Validators.required],
        productCategory: ['', Validators.required],
        productPrice: ['', Validators.required],
        productImageURL: ['']
      });

      //FETCHES PRODUCT BRAND DATA
      this.api.getBrands().subscribe((data: any)=> {
        this.brandName = data;
      })

      //FETCHES PRODUCT CATEGORY DATA
      this.api.getCategory().subscribe((data: any)=> {
        this.categoryName = data
      })
    }
    
    //WHEN THE FILE IS SELECTED, THE TARGET DATA (said file) WILL BE UPLOADED
    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
    }



    addProduct() {
      const formData = new FormData();
      formData.append('productName', this.productForm.get('productName')!.value);
      formData.append('productDescription', this.productForm.get('productDescription')!.value);
      formData.append('productStock', this.productForm.get('productStock')!.value);
      formData.append('productBrand', this.productForm.get('productBrand')!.value);
      formData.append('productCategory', this.productForm.get('productCategory')!.value);
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
              this.snackBar.open('Une Erreur est survenue', 'Close', {
                duration: 3000,
                panelClass: ['error-snackbar']
              });
            }
        });
    }
    
    closepopup(){
      this.ref.close();
    }
  }