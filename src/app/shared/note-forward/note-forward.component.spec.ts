import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteForwardComponent } from './note-forward.component';

describe('NoteForwardComponent', () => {
  let component: NoteForwardComponent;
  let fixture: ComponentFixture<NoteForwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteForwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteForwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
