import { ReduxService } from './../../services/utils/redux.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@angular/material';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsSidenavComponent } from './contacts-sidenav.component';

describe('ContactsSidenavComponent', () => {
  let component: ContactsSidenavComponent;
  let fixture: ComponentFixture<ContactsSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, RouterTestingModule], declarations: [ContactsSidenavComponent],
      providers: [ReduxService]
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
