import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticsSidenavComponent } from './logistics-sidenav.component';

describe('LogisticsSidenavComponent', () => {
  let component: LogisticsSidenavComponent;
  let fixture: ComponentFixture<LogisticsSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogisticsSidenavComponent ]
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
