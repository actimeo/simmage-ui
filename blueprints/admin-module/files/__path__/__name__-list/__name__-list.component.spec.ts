/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import '../../../rxjs_operators';

import { <%= classifiedModuleName %>ListComponent } from './<%= dasherizedModuleName %>-list.component';
import { AppModule } from '../../../app.module';
import { <%= classifiedModuleName %>Module } from '../<%= dasherizedModuleName %>.module';
import { <%= classifiedModuleName %>Service } from '../<%= dasherizedModuleName %>.service';

let comp: <%= classifiedModuleName %>ListComponent;
let fixture: ComponentFixture<<%= classifiedModuleName %>ListComponent>;
let els: DebugElement[];
let <%= camelizedModuleName %>Service: <%= classifiedModuleName %>Service;

class Fake<%= classifiedModuleName %>Service = {
  load<%= classifiedModuleName %>() {
    return Observable.of([
      // Todo : fill the mock load function with data where ids are 1 and 4
    ]);
  }
}

const fake<%= classifiedModuleName %>Service = new Fake<%= classifiedModuleName %>Service();

const fakeActivatedRoute = {
  params: Observable.of({ toto: 'titi', 'selid': '1' })
};

const fakeActivatedRouteWithoutSel = {
  params: Observable.of({ toto: 'titi' })
};

describe('Component: <%= classifiedModuleName %>List', () => {
  it('should get a list of <%= dasherizedModuleName %>', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, <%= classifiedModuleName %>Module, RouterTestingModule],
      providers: [
        { provide: <%= classifiedModuleName %>Service, useValue: fake<%= classifiedModuleName %>Service },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(<%= classifiedModuleName %>ListComponent);
    comp = fixture.componentInstance;
    <%= dasherizedModuleName %>Service = fixture.debugElement.injector.get(<%= classifiedModuleName %>Service);

    fixture.detectChanges();

    comp.<%= dasherizedModuleName %>Data.subscribe(r => {
      expect(r.length).toBe(2, '<%= dasherizedModuleName %>Data length should be 2');
    });

    els = fixture.debugElement.queryAll(By.css('md-list-item'));
    expect(els.length).toBe(2, 'you should have 2 list items in your template');

    els = fixture.debugElement.queryAll(By.css('h3.mod-sidenav'));
    expect(els[0].nativeElement.textContent).toContain('<%= classifiedModuleName %> 1', 'First item name should be <%= classifiedModuleName %> 1');
  });

  it('should subscribe/unsubscribe', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, <%= classifiedModuleName %>Module, RouterTestingModule],
      providers: [
        { provide: <%= classifiedModuleName %>Service, useValue: fake<%= classifiedModuleName %>Service },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(<%= classifiedModuleName %>ListComponent);
    comp = fixture.componentInstance;
    <%= dasherizedModuleName %>Service = fixture.debugElement.injector.get(<%= classifiedModuleName %>Service);

    fixture.detectChanges();

    expect(comp.sub).not.toBeNull('...');
    expect(comp.sub).toEqual(jasmine.any(Subscription));

    spyOn(comp.sub, 'unsubscribe');
    comp.ngOnDestroy();

    expect(comp.sub.unsubscribe).toHaveBeenCalled();
  });

    it('should add a "selected" class to the selected <%= dasherizedModuleName %>, () => {
    TestBed.configureTestingModule({
      imports: [AppModule, <%= classifiedModuleName %>Module, RouterTestingModule],
      providers: [
        { provide: <%= classifiedModuleName %>Service, useValue: fake<%= classifiedModuleName %>Service },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteWithoutSel }
      ]
    });

    fixture = TestBed.createComponent(<%= classifiedModuleName %>ListComponent);
    comp = fixture.componentInstance;
    <%= dasherizedModuleName %>Service = fixture.debugElement.injector.get(<%= classifiedModuleName %>Service);

    fixture.detectChanges();

    els = fixture.debugElement.queryAll(By.css('md-list-item.selected'));
    expect(els.length).toBe(0, 'no item should be selected');

    comp.selectedId = 4;
    fixture.detectChanges();
    els = fixture.debugElement.queryAll(By.css('md-list-item.selected h3'));
    expect(els.length).toBe(1, 'an item should be selected');
    expect(els[0].nativeElement.textContent).toContain('<%= classifiedModuleName %> 4', '<%= classifiedModuleName %> 4 should be the one selected');
  });

  it('should add a "selected" class to the selected <%= dasherizedModuleName %> from selid query param route', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, <%= classifiedModuleName %>Module, RouterTestingModule],
      providers: [
        { provide: <%= classifiedModuleName %>Service, useValue: fake<%= classifiedModuleName %>Service },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(<%= classifiedModuleName %>ListComponent);
    comp = fixture.componentInstance;
    <%= dasherizedModuleName %>Service = fixture.debugElement.injector.get(<%= classifiedModuleName %>Service);

    fixture.detectChanges();
    els = fixture.debugElement.queryAll(By.css('md-list-item.selected'));
    expect(els.length).toBe(1, '1 item should be selected');
    expect(els[0].nativeElement.textContent).toContain('<%= classifiedModuleName %> 1', '<%= classifiedModuleName %> 1 should be the one selected');

    expect(comp.selectedId).toBe(1);
  });
});
