/* tslint:disable:no-unused-variable */
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from './../../shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DossiersComponent } from './dossiers.component';

describe('DossiersComponent', () => {
  let component: DossiersComponent;
  let fixture: ComponentFixture<DossiersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DossiersComponent],
      imports: [SharedModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DossiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
