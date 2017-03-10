import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsUserinfoComponent } from './contacts-userinfo.component';

describe('ContactsUserinfoComponent', () => {
  let component: ContactsUserinfoComponent;
  let fixture: ComponentFixture<ContactsUserinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsUserinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsUserinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
