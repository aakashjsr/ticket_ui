import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNetworksComponent } from './add-networks.component';

describe('AddNetworksComponent', () => {
  let component: AddNetworksComponent;
  let fixture: ComponentFixture<AddNetworksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNetworksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNetworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
