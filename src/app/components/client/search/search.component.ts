import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/services/product/product.service';
import { IProductDocument } from '../../../../../models/product.model'; // Correct import
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  products: IProductDocument[] = [];
  searchQuery: string;
  
  constructor(private productService: ProductService,private route: ActivatedRoute, private router: Router, private fb: FormBuilder){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'];
      this.fetchData();
    });
  }

  fetchData() {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        alert("error while fetching products data");
      }
    });
  }
  onSearch(searchTerm: string) {
    if (searchTerm.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: searchTerm.trim() } });
    } else {
      // Handle empty search term
    }
  }
}

