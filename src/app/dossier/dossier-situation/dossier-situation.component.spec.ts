import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierSituationComponent } from './dossier-situation.component';

describe('DossierSituationComponent', () => {
  let component: DossierSituationComponent;
  let fixture: ComponentFixture<DossierSituationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DossierSituationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DossierSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
