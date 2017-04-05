import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierDocumentComponent } from './dossier-document.component';

describe('DossierDocumentComponent', () => {
  let component: DossierDocumentComponent;
  let fixture: ComponentFixture<DossierDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DossierDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DossierDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
