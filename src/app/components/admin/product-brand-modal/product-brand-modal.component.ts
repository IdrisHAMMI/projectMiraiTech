import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminPanelService } from 'src/services/admin/adminpanel.service';
MatSnackBar
@Component({
  selector: 'app-product-brand-modal',
  templateUrl: './product-brand-modal.component.html',
  styleUrl: './product-brand-modal.component.css'
})
export class ProductBrandModalComponent implements OnInit{

  brandForm !: FormGroup;
  
  constructor(private formBuilder : FormBuilder, 
    private api: AdminPanelService,
    private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.brandForm = this.formBuilder.group({
      brandName: ['', Validators.required],
    })
  }
  
  addBrand() {
    this.api.addBrand(this.brandForm.value)
    .subscribe({
      next:(res)=> {
        this.snackBar.open('Marque de Produit Crée!', 'Fermer', {duration: 2000});
      },
      error:(err)=> {
        this.snackBar.open('Une erreur est survenu.', 'Fermer', {duration: 2000});
      }
    })
  }
}
