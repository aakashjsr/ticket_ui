import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TktEditHistoryComponent } from './tkt-edit-history.component';

describe('TktEditHistoryComponent', () => {
  let component: TktEditHistoryComponent;
  let fixture: ComponentFixture<TktEditHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TktEditHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TktEditHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
