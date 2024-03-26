import { Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminPanelService } from 'src/services/admin/adminpanel.service';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrl: './edit-product-modal.component.css'
})
export class EditProductModalComponent implements OnInit {

  productForm!: FormGroup
  selectedFile: File | undefined;

  constructor(private formBuilder : FormBuilder, 
    private api: AdminPanelService,
    private snackBar: MatSnackBar,
    private dialogRef : MatDialogRef<EditProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any){}

  ngOnInit(): void {
    const productId = this.editData._id;
    console.log('Product ID:', productId);

    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productDescription: ['', Validators.required],
      productStock: ['', Validators.required],
      productBrand: ['', Validators.required],
      productPrice: ['', Validators.required],
      productImageURL: ['']

    })
}

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}


editProduct() {
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

  //EDITS THE PRODUCT VALUE WITH THE PRODUCT ID
  this.api.editProduct(this.editData._id, formData)
  .subscribe({
    next:(res)=> {
      this.snackBar.open('Produit Modifié!', 'Fermer', {duration: 2000});
      this.productForm.reset();
    },
    error:()=> {
      alert("error while modifying data");
    }
  })
}
}