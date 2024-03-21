import { Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminPanelService } from 'src/services/admin/adminpanel.service';
import { AdminProductsComponent } from '../admin-products/admin-products.component';


@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrl: './edit-product-modal.component.css'
})
export class EditProductModalComponent implements OnInit {

  productForm!: FormGroup

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

    })
}

editProduct() {
  //EDITS THE PRODUCT VALUE WITH THE PRODUCT ID
  this.api.editProduct(this.editData._id, this.productForm.value)
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