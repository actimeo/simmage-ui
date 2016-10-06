/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import '../../../rxjs_operators';

import { EventsTypesListComponent } from './events-types-list.component';
import { AppModule } from '../../../app.module';
import { EventsTypesModule } from '../events-types.module';
import { EventsTypesService } from '../events-types.service';

let comp: EventsTypesListComponent;
let fixture: ComponentFixture<EventsTypesListComponent>;
let els: DebugElement[];
let eventsTypesService: EventsTypesService;

class FakeEventsTypesService {
  loadEventsTypes() {
    return Observable.of([
      {
        id: 1,
        name: 'a name'
      },
      {
        id: 4,
        name: 'another name'
      }
    ]);
  }
}

const fakeEventsTypesService = new FakeEventsTypesService();

const fakeActivatedRoute = {
  params: Observable.of({ toto: 'titi', 'selid': '1' })
};

const fakeActivatedRouteWithoutSel = {
  params: Observable.of({ toto: 'titi' })
};

describe('Component: EventsTypesList', () => {
  it('should get a list of events-types', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, EventsTypesModule, RouterTestingModule],
      providers: [
        { provide: EventsTypesService, useValue: fakeEventsTypesService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(EventsTypesListComponent);
    comp = fixture.componentInstance;
    eventsTypesService = fixture.debugElement.injector.get(EventsTypesService);

    fixture.detectChanges();

    comp.eventsTypesData.subscribe(r => {
      expect(r.length).toBe(2, 'events-typesData length should be 2');
    });

    els = fixture.debugElement.queryAll(By.css('md-list-item'));
    expect(els.length).toBe(2, 'you should have 2 list items in your template');

    els = fixture.debugElement.queryAll(By.css('h3.mod-sidenav'));
    expect(els[0].nativeElement.textContent).toContain('a name', 'First item name should be a name');
  });

  it('should subscribe/unsubscribe', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, EventsTypesModule, RouterTestingModule],
      providers: [
        { provide: EventsTypesService, useValue: fakeEventsTypesService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(EventsTypesListComponent);
    comp = fixture.componentInstance;
    eventsTypesService = fixture.debugElement.injector.get(EventsTypesService);

    fixture.detectChanges();

    expect(comp.sub).not.toBeNull('...');
    expect(comp.sub).toEqual(jasmine.any(Subscription));

    spyOn(comp.sub, 'unsubscribe');
    comp.ngOnDestroy();

    expect(comp.sub.unsubscribe).toHaveBeenCalled();
  });

    it('should add a "selected" class to the selected events-types', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, EventsTypesModule, RouterTestingModule],
      providers: [
        { provide: EventsTypesService, useValue: fakeEventsTypesService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteWithoutSel }
      ]
    });

    fixture = TestBed.createComponent(EventsTypesListComponent);
    comp = fixture.componentInstance;
    eventsTypesService = fixture.debugElement.injector.get(EventsTypesService);

    fixture.detectChanges();

    els = fixture.debugElement.queryAll(By.css('md-list-item.selected'));
    expect(els.length).toBe(0, 'no item should be selected');

    comp.selectedId = 4;
    fixture.detectChanges();
    els = fixture.debugElement.queryAll(By.css('md-list-item.selected h3'));
    expect(els.length).toBe(1, 'an item should be selected');
    expect(els[0].nativeElement.textContent).toContain('another name', 'another name should be the one selected');
  });

  it('should add a "selected" class to the selected events-types from selid query param route', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, EventsTypesModule, RouterTestingModule],
      providers: [
        { provide: EventsTypesService, useValue: fakeEventsTypesService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(EventsTypesListComponent);
    comp = fixture.componentInstance;
    eventsTypesService = fixture.debugElement.injector.get(EventsTypesService);

    fixture.detectChanges();
    els = fixture.debugElement.queryAll(By.css('md-list-item.selected'));
    expect(els.length).toBe(1, '1 item should be selected');
    expect(els[0].nativeElement.textContent).toContain('a name', 'a name should be the one selected');

    expect(comp.selectedId).toBe(1);
  });
});
