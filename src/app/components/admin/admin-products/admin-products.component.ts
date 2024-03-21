import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddProductModalComponent } from '../add-product-modal/add-product-modal.component';
import { EditProductModalComponent } from '../edit-product-modal/edit-product-modal.component';
import { AdminPanelService } from 'src/services/admin/adminpanel.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  displayedColumns: string[] = ['_id', 'productBrand', 'productDescription', 'productName', 'productStock', 'productPrice', 'action'];
  dataSource!: MatTableDataSource<any>;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private api: AdminPanelService) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  createProduct() {
    const dialogRef = this.dialog.open(AddProductModalComponent, {
        width: '30%',
        height: '600px'
      });

      dialogRef.afterClosed().subscribe(result => {
        this.fetchProducts();
      });

    }

  editProduct(editData: any) {
    const dialogRef = this.dialog.open(EditProductModalComponent , {
      width: '30%',
      height: '600px',
      data: editData,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchProducts();
    });
  }

  deleteProduct(id: string){
    this.api.deleteProduct(id)
    .subscribe({
      next:(res)=>{
        this.snackBar.open('Produit Supprimé!', 'Fermer', {duration: 2000});
        this.fetchProducts();
      },
      error:()=>{
      alert("error while deleting record")
      }
    })
  }

  fetchProducts() {
    this.api.getProducts()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
        },
        error: (err) => {
          alert("error while fetching products data");
        }
      });
  }
}
