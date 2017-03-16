import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelativesComponent } from './relatives.component';

describe('RelativesComponent', () => {
  let component: RelativesComponent;
  let fixture: ComponentFixture<RelativesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelativesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
