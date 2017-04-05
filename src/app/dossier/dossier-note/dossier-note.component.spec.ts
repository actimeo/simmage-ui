import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierNoteComponent } from './dossier-note.component';

describe('DossierNoteComponent', () => {
  let component: DossierNoteComponent;
  let fixture: ComponentFixture<DossierNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DossierNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DossierNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
