import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierDetailsIndividualComponent } from './dossier-details-individual.component';

describe('DossierDetailsIndividualComponent', () => {
  let component: DossierDetailsIndividualComponent;
  let fixture: ComponentFixture<DossierDetailsIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DossierDetailsIndividualComponent],
      imports: [RouterTestingModule, MaterialModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DossierDetailsIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
