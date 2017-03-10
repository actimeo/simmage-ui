import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsMainComponent } from './contacts-main.component';

describe('ContactsMainComponent', () => {
  let component: ContactsMainComponent;
  let fixture: ComponentFixture<ContactsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
