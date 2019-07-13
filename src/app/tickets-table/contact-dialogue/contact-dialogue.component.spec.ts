import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDialogueComponent } from './contact-dialogue.component';

describe('ContactDialogueComponent', () => {
  let component: ContactDialogueComponent;
  let fixture: ComponentFixture<ContactDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
