import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsUserinfoComponent } from './reservations-userinfo.component';

describe('ReservationsUserinfoComponent', () => {
  let component: ReservationsUserinfoComponent;
  let fixture: ComponentFixture<ReservationsUserinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationsUserinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationsUserinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
