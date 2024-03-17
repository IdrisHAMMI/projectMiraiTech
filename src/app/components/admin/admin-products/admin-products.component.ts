import { createProduct } from './../../../../../controllers/product/products.controller';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/services/product/product.service';
import { AddProductModalComponent } from '../add-product-modal/add-product-modal.component';
import { EditProductModalComponent } from '../edit-product-modal/edit-product-modal.component';
import { DeleteProductModalComponent } from '../delete-product-modal/delete-product-modal.component';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  displayedColumns: string[] = ['_id', 'productBrand', 'productDescription', 'productName', 'action'];
  dataSource!: MatTableDataSource<any>;

  constructor(private dialog: MatDialog, private api: ProductService) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  createProduct() {
    this.dialog.open(AddProductModalComponent, {
        width: '30%',
        height: '600px'
      })
    }

  editProduct(): void {
    this.dialog.open(EditProductModalComponent , {
      width: '60%',
      height: '800px'
    })
  }

  deleteProduct(): void {
    this.dialog.open(DeleteProductModalComponent, {
      width: '60%',
      height: '800px'
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
