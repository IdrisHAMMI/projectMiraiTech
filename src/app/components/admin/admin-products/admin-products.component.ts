import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductService } from 'src/services/product/product.service';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent implements OnInit {

  displayedColumns : string[] = ['_id','productBrand', 'productDescription', 'productName'];
  dataSource!: MatTableDataSource<any>

  constructor(private dialog: MatDialog, private api : ProductService){}

 ngOnInit(): void {
     this.fetchProducts();
 }

  fetchProducts() {
    this.api.getProducts()
    .subscribe({
      next:(res)=> {
        this.dataSource = new MatTableDataSource(res);
      },
      error:(err)=>{
        alert("error while fetching products data")
      }
    })
  }
  
}
