import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierEventComponent } from './dossier-event.component';

describe('DossierEventComponent', () => {
  let component: DossierEventComponent;
  let fixture: ComponentFixture<DossierEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DossierEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DossierEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
