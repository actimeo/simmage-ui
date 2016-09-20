/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ErrorMsgComponent } from './error-msg.component';
import { AppModule } from '../../app.module';

let fixture: ComponentFixture<ErrorMsgComponent>;
let component: ErrorMsgComponent;
let els: DebugElement[];
let el: DebugElement;

describe('Component: ErrorMsg', () => {
  it('should create an instance', () => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: []
    });

    fixture = TestBed.createComponent(ErrorMsgComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();

    component.msg = '';
    fixture.detectChanges();
    els = fixture.debugElement.queryAll(By.css('div.app-error'));
    expect(els.length).toEqual(0, 'message should not appear');

    component.msg = 'a non empty message';
    fixture.detectChanges();
    els = fixture.debugElement.queryAll(By.css('div.app-error'));
    expect(els.length).toEqual(1, 'message should appear');

    const element = fixture.nativeElement;
    const iconToggle = element.querySelector('md-icon');
    iconToggle.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.detailsVisible).toEqual(true);
    els = fixture.debugElement.queryAll(By.css('p.pre'));
    expect(els.length).toEqual(1, 'details should appear');
  });
});
