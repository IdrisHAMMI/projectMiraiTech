import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileAddressesComponent } from './user-profile-addresses.component';

describe('UserProfileAddressesComponent', () => {
  let component: UserProfileAddressesComponent;
  let fixture: ComponentFixture<UserProfileAddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileAddressesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProfileAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
