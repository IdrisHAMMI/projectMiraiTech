import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipdeetsModalComponent } from './shipdeets-modal.component';

describe('ShipdeetsModalComponent', () => {
  let component: ShipdeetsModalComponent;
  let fixture: ComponentFixture<ShipdeetsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipdeetsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShipdeetsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
