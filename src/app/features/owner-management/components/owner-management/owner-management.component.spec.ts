import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerManagementComponent } from './owner-management.component';

describe('OwnerManagementComponent', () => {
  let component: OwnerManagementComponent;
  let fixture: ComponentFixture<OwnerManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerManagementComponent]
    });
    fixture = TestBed.createComponent(OwnerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
