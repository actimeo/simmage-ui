import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierDetailsGroupedComponent } from './dossier-details-grouped.component';

describe('DossierDetailsGroupedComponent', () => {
  let component: DossierDetailsGroupedComponent;
  let fixture: ComponentFixture<DossierDetailsGroupedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DossierDetailsGroupedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DossierDetailsGroupedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
