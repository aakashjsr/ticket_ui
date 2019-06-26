import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsTableComponent } from './vendors-table.component';

describe('VendorsTableComponent', () => {
  let component: VendorsTableComponent;
  let fixture: ComponentFixture<VendorsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
