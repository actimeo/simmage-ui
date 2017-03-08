/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler'

import { SelectGenericComponent } from './select-generic.component';
import { AppModule } from '../../app.module';

let comp: SelectGenericComponent;
let fixture: ComponentFixture<SelectGenericComponent>;
let els: DebugElement[];

const fakeElements = [
  {
    id: 1,
    name: 'element 1'
  },
  {
    id: 2,
    name: 'object 2',
  },
  {
    id: 3,
    name: 'element 3'
  }
];


describe('Component: SearchElements', () => {
  it('should display a select with elements', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule]
    });

    fixture = TestBed.createComponent(SelectGenericComponent);
    comp = fixture.componentInstance;

    comp.elements = fakeElements;
    comp.ngOnChanges();
    fixture.detectChanges();

    els = fixture.debugElement.queryAll(By.css('select'));
    expect(els).not.toBe(null, 'You should have a select in your template');

    els = fixture.debugElement.queryAll(By.css('option'));
    expect(els.length).toBe(4, 'You should have 4 options in your select, one of them being the default choice when no other option is selected');
    expect(els[1].nativeElement.textContent).toContain('element 1', 'The second option of your select should be element 1');
    expect(els[3].nativeElement.value).toBe('3', 'The last option should have a value of 3');
  });

  it('should subscribe to and detect input changes', fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule]
    });

    fixture = TestBed.createComponent(SelectGenericComponent);
    comp = fixture.componentInstance;
    comp.elements = fakeElements;
    comp.ngOnChanges();
    fixture.detectChanges();
    expect(comp.filterSubscribe).not.toBe(null, 'You should have a subscription to the input value changes');
    const inputFilter = fixture.nativeElement.querySelectorAll('input')[0];

    inputFilter.value = 'object';
    inputFilter.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(300);

    fixture.detectChanges();

    expect(comp.filtered).toBe(true, 'Boolean "filtered" should have turned true');
  }));

  it('should return only filtered elements', fakeAsync(() => {
    TestBed.configureTestingModule({
      imports : [AppModule, RouterTestingModule]
    });

    fixture = TestBed.createComponent(SelectGenericComponent);
    comp = fixture.componentInstance;
    comp.elements = fakeElements;
    comp.ngOnChanges();
    fixture.detectChanges();

    const inputFilter = fixture.nativeElement.querySelectorAll('input')[0];
    inputFilter.value = 'object';
    inputFilter.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(300);
    fixture.detectChanges();
    

    els = fixture.debugElement.queryAll(By.css('option'));
    expect(els.length).toBe(2, 'You should have only one result from the filter and the default option');
    expect(els[0].nativeElement.textContent).toContain('1 result(s) found', 'Default option should display "1 result(s) found"');
    expect(els[1].nativeElement.textContent).toContain('object 2', 'You should have the element "object 2" as the only filtered result');
  }));

  it('should reset the option list to all elements if less than 3 characters inside the input', fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule]
    });

    fixture = TestBed.createComponent(SelectGenericComponent);
    comp = fixture.componentInstance;
    comp.elements = fakeElements;
    comp.ngOnChanges();
    fixture.detectChanges();

    const inputFilter = fixture.nativeElement.querySelectorAll('input')[0];
    inputFilter.value = 'object';
    inputFilter.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(300);
    fixture.detectChanges();

    els = fixture.debugElement.queryAll(By.css('option'));
    expect(els.length).toBe(2);
    expect(comp.filtered).toBe(true);
    
    inputFilter.value = 'ob';
    inputFilter.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(300);
    fixture.detectChanges();

    els = fixture.debugElement.queryAll(By.css('option'));
    expect(els.length).toBe(4, 'You should have 4 options back : 1 default option and 3 elements');
    expect(comp.filtered).toBe(false, 'Boolean "filterSubscribe" should have reverted back to false');
  }));

  it('should empty input field when clicking on span X', fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule]
    });

    fixture = TestBed.createComponent(SelectGenericComponent);
    comp = fixture.componentInstance;
    comp.elements = fakeElements;
    comp.ngOnChanges();
    fixture.detectChanges();

    let inputFilter = fixture.nativeElement.querySelectorAll('input')[0];
    inputFilter.value = 'object';
    inputFilter.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(300);
    fixture.detectChanges();

    els = fixture.debugElement.queryAll(By.css('option'));
    expect(comp.filtered).toBe(true);
    expect(els.length).toBe(2);

    const span = fixture.nativeElement.querySelector('.inputline span');
    expect(span).not.toBe(null, 'Your input should have a span inside the input');

    span.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick(300);
    fixture.detectChanges();

    els = fixture.debugElement.queryAll(By.css('option'));

    expect(inputFilter.value).toBe('', 'Click action on span should have emptied the input');
    expect(comp.filtered).toBe(false);
    expect(els.length).toBe(4, 'Select elements should not be filtered anymore');
  }));

  it('should add an element to a list shown bellow the input', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule]
    });

    fixture = TestBed.createComponent(SelectGenericComponent);
    comp = fixture.componentInstance;
    comp.elements = fakeElements;
    comp.ngOnChanges();
    fixture.detectChanges();

    comp.elementsCtrl.setValue(1);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    els = fixture.debugElement.queryAll(By.css('md-list-item'));

    expect(els.length).toBe(1, 'Component template should display the current selected items');
  });

  it('should add an element to a list shown bellow the input', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule]
    });

    fixture = TestBed.createComponent(SelectGenericComponent);
    comp = fixture.componentInstance;
    comp.elements = fakeElements;
    comp.ngOnChanges();
    fixture.detectChanges();

    comp.elementsCtrl.setValue(1);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    comp.elementsCtrl.setValue(2);
    fixture.detectChanges();
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    
    els = fixture.debugElement.queryAll(By.css('md-list-item'));

    expect(els.length).toBe(2, 'Component template should display 2 items in the list');

    const dbin = fixture.nativeElement.querySelectorAll('md-list-item md-icon')[0];
    dbin.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    els = fixture.debugElement.queryAll(By.css('md-list-item'));

    expect(els.length).toBe(1, 'Item list length should be only 1 after deleting one of the previous items');
  });

});
