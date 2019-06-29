import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendorAccountComponent } from './add-vendor-account.component';

describe('AddVendorAccountComponent', () => {
  let component: AddVendorAccountComponent;
  let fixture: ComponentFixture<AddVendorAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVendorAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVendorAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
