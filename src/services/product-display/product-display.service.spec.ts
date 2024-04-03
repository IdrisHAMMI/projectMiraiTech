import { TestBed } from '@angular/core/testing';

import { ProductDisplayService } from './product-display.service';

describe('ProductDisplayService', () => {
  let service: ProductDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
