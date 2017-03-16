import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticsMainComponent } from './logistics-main.component';

describe('LogisticsMainComponent', () => {
  let component: LogisticsMainComponent;
  let fixture: ComponentFixture<LogisticsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogisticsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
