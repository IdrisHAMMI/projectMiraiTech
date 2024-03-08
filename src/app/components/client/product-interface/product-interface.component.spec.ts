import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInterfaceComponent } from './product-interface.component';

describe('ProductInterfaceComponent', () => {
  let component: ProductInterfaceComponent;
  let fixture: ComponentFixture<ProductInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductInterfaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
