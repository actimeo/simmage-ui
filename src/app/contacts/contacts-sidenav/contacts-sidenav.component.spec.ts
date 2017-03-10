import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsSidenavComponent } from './contacts-sidenav.component';

describe('ContactsSidenavComponent', () => {
  let component: ContactsSidenavComponent;
  let fixture: ComponentFixture<ContactsSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
