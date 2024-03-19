import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserModalAdminComponent } from './create-user-modal-admin.component';

describe('CreateUserModalAdminComponent', () => {
  let component: CreateUserModalAdminComponent;
  let fixture: ComponentFixture<CreateUserModalAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUserModalAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUserModalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
