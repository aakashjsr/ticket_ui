import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsAccountTableComponent } from './vendors-account-table.component';

describe('VendorsAccountTableComponent', () => {
  let component: VendorsAccountTableComponent;
  let fixture: ComponentFixture<VendorsAccountTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorsAccountTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorsAccountTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
