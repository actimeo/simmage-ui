import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierSidenavComponent } from './dossier-sidenav.component';

describe('DossierSidenavComponent', () => {
  let component: DossierSidenavComponent;
  let fixture: ComponentFixture<DossierSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DossierSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DossierSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
