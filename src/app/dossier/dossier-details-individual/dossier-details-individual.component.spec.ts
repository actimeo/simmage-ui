import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierDetailsIndividualComponent } from './dossier-details-individual.component';

describe('DossierDetailsIndividualComponent', () => {
  let component: DossierDetailsIndividualComponent;
  let fixture: ComponentFixture<DossierDetailsIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DossierDetailsIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DossierDetailsIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
