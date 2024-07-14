import { IProductDocument } from './../../../models/product.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  })
  //FILTER PIPE FOR SEARCH COMPONENT
export class FilterPipe implements PipeTransform {

  transform(products: IProductDocument[], searchTerm: string): IProductDocument[] {
    if (!products || !searchTerm) {
      return products;
    }

    searchTerm = searchTerm.toLowerCase().trim();

    return products.filter(product =>
      product.productName.toLowerCase().includes(searchTerm) ||
      product.productDescription.toLowerCase().includes(searchTerm)
    );
  }
}

