import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientSiteComponent } from './add-client-site.component';

describe('AddClientSiteComponent', () => {
  let component: AddClientSiteComponent;
  let fixture: ComponentFixture<AddClientSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClientSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClientSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
