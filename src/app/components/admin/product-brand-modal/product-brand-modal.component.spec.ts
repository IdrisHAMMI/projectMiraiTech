import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBrandModalComponent } from './product-brand-modal.component';

describe('ProductBrandModalComponent', () => {
  let component: ProductBrandModalComponent;
  let fixture: ComponentFixture<ProductBrandModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductBrandModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductBrandModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
