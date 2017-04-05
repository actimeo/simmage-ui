import { DossierDetailsGroupedComponent } from './../dossier-details-grouped/dossier-details-grouped.component';
import { DossierDetailsIndividualComponent } from './../dossier-details-individual/dossier-details-individual.component';
import { ReduxService } from './../../services/utils/redux.service';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierDetailsComponent } from './dossier-details.component';

describe('DossierDetailsComponent', () => {
  let component: DossierDetailsComponent;
  let fixture: ComponentFixture<DossierDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule, RouterTestingModule ],
      declarations: [ DossierDetailsComponent, DossierDetailsIndividualComponent, DossierDetailsGroupedComponent ],
      providers: [ ReduxService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DossierDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
