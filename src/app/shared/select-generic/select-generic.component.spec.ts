/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';

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

    fixture.detectChanges();
    comp.elements = fakeElements;
    comp.ngOnInit();
    fixture.detectChanges();

    els = fixture.debugElement.queryAll(By.css('select'));
    expect(els).not.toBe(null, 'You should have a select in your template');

    els = fixture.debugElement.queryAll(By.css('option'));
    expect(els.length).toBe(4, 'You should have 4 options in your select, one of them being the default choice when no other option is selected');
    expect(els[1].nativeElement.textContent).toContain('element 1', 'The second option of your select should be element 1');
    expect(els[3].nativeElement.value).toBe('3', 'The last option should have a value of 3');
  });

  it('should subscribe to input changes', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule]
    });

    fixture = TestBed.createComponent(SelectGenericComponent);
    comp = fixture.componentInstance;
    comp.elements = fakeElements;
    comp.ngOnInit();
    fixture.detectChanges();
    expect(comp.filterSubscribe).not.toBe(null, 'You should have a subscription to the input value changes');
    const inputFilter = fixture.nativeElement.querySelectorAll('input')[0];

    inputFilter.value = 'object';
    inputFilter.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    setTimeout(function() { 
      expect(comp.filtered).toBe(true, 'Boolean "filtered" should have turned true');
    }, 300); // let some time for debounce to be effective    
  });

  it('should return only filtered elements', () => {
    TestBed.configureTestingModule({
      imports : [AppModule, RouterTestingModule]
    });

    fixture = TestBed.createComponent(SelectGenericComponent);
    comp = fixture.componentInstance;
    comp.elements = fakeElements;
    comp.ngOnInit();
    fixture.detectChanges();

    const inputFilter = fixture.nativeElement.querySelectorAll('input')[0];
    inputFilter.value = 'object';
    inputFilter.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    setTimeout(function() {
      els = fixture.debugElement.queryAll(By.css('option'));
      expect(els.length).toBe(2, 'You should have only one result from the filter and the default option');
      expect(els[0].nativeElement.textContent).toContain('1 result(s) found', 'Default option should display "1 result(s) found"');
      expect(els[1].nativeElement.textContent).toContain('object 2', 'You should have the element "object 2" as the only filtered result');
    }, 300);
  });
});
