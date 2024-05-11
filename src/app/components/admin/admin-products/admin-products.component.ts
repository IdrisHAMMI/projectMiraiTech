import { IProductDocument } from './../../../../../models/product.model';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddProductModalComponent } from '../add-product-modal/add-product-modal.component';
import { EditProductModalComponent } from '../edit-product-modal/edit-product-modal.component';
import { AdminPanelService } from 'src/services/admin/adminpanel.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductBrandModalComponent } from '../product-brand-modal/product-brand-modal.component';
import { ProductTypeModalComponent } from '../product-type-modal/product-type-modal.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements AfterViewInit {

  displayedColumns: string[] = ['_id', 'brandName', 'categoryName', 'productName', 'productStock', 'productPrice', 'productImageURL', 'action'];
  dataSource!: MatTableDataSource<any>;
  products: IProductDocument[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  

  constructor(private dialog: MatDialog, 
    private snackBar: MatSnackBar,
    private api: AdminPanelService) { }

  
  ngAfterViewInit(): void {
    this.fetchProducts();
  }

  //PRODUCT CREATION MODAL
  createProduct() {
    const dialogRef = this.dialog.open(AddProductModalComponent, {
        width: '30%',
        height: '720px',
        data: { products: this.products }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.fetchProducts();
      });
    }
  
  //PRODUCT EDIT MODAL
  editProduct(editData: any) {
    const dialogRef = this.dialog.open(EditProductModalComponent , {
      width: '30%',
      height: '720px',
      data: editData,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchProducts();
    });
  }

  //PRODUCT DELETION MODAL
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

  //PRODUCT DATA FETCH MODAL
  fetchProducts() {
    this.api.getProducts().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        alert("error while fetching products data");
      }
    });
  }

  //PRODUCT BRAND CREATION MODAL
  addBrand() {
    this.dialog.open(ProductBrandModalComponent, {
      width: '30%',
      height: '300px',
    });
  }

  //PRODUCT CATEGORY CREATION MODAL
  addCategory() {
    this.dialog.open(ProductTypeModalComponent, {
      width: '30%',
      height: '300px',
    });
  }

}
