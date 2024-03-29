import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminPanelService } from 'src/services/admin/adminpanel.service';


@Component({
  selector: 'app-product-type-modal',
  templateUrl: './product-type-modal.component.html',
  styleUrl: './product-type-modal.component.css'
})
export class ProductTypeModalComponent implements OnInit {

  categoryForm!: FormGroup;

  constructor(private formBuilder : FormBuilder,
    private api : AdminPanelService,
    private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
    })
  }

  addCategory() {
    this.api.addCategory(this.categoryForm.value)
    .subscribe({
      next:(res)=> {
        this.snackBar.open('Type de Categorie Crée!', 'Fermer', {duration: 2000});
    },
    error:(err) => {
      this.snackBar.open('Une erreur est survenu.', 'Fermer', {duration: 2000});
    }
  })
  }
}