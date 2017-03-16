import { RouterTestingModule } from '@angular/router/testing';
import { ReduxService } from './../../services/utils/redux.service';
import { MaterialModule } from '@angular/material';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticsSidenavComponent } from './logistics-sidenav.component';

describe('LogisticsSidenavComponent', () => {
  let component: LogisticsSidenavComponent;
  let fixture: ComponentFixture<LogisticsSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule, RouterTestingModule ], declarations: [ LogisticsSidenavComponent ],
      providers: [ ReduxService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticsSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
