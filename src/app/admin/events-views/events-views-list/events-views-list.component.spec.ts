/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import '../../../rxjs_operators';

import { EventsViewsListComponent } from './events-views-list.component';
import { AppModule } from '../../../app.module';
import { EventsViewsModule } from '../events-views.module';
import { EventsViewsService } from '../events-views.service';

let comp: EventsViewsListComponent;
let fixture: ComponentFixture<EventsViewsListComponent >;
let els: DebugElement[];
let eventsViewsService: EventsViewsService;

class FakeEventsViewsService {
  load EventsViews() {
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

const fakeEventsViewsService = new Fake EventsViewsService();

const fakeActivatedRoute = {
  params: Observable.of({ toto: 'titi', 'selid': '1' })
};

const fakeActivatedRouteWithoutSel = {
  params: Observable.of({ toto: 'titi' })
};

describe('Component: EventsViewsList', () => {
  it('should get a list of events-views', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, EventsViewsModule, RouterTestingModule],
      providers: [
        { provide: EventsViewsService, useValue: fake EventsViewsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(EventsViewsListComponent);
    comp = fixture.componentInstance;
    eventsViewsService = fixture.debugElement.injector.get(EventsViewsService);

    fixture.detectChanges();

    comp.eventsViewsData.subscribe(r => {
      expect(r.length).toBe(2, 'events-viewsData length should be 2');
    });

    els = fixture.debugElement.queryAll(By.css('md-list-item'));
    expect(els.length).toBe(2, 'you should have 2 list items in your template');

    els = fixture.debugElement.queryAll(By.css('h3.mod-sidenav'));
    expect(els[0].nativeElement.textContent).toContain('a name', 'First item name should be a name');
  });

  it('should add a "selected" class to the selected events-views', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, EventsViewsModule, RouterTestingModule],
      providers: [
        { provide: EventsViewsService, useValue: fake EventsViewsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteWithoutSel }
      ]
    });

    fixture = TestBed.createComponent(EventsViewsListComponent);
    comp = fixture.componentInstance;
    eventsViewsService = fixture.debugElement.injector.get(EventsViewsService);

    fixture.detectChanges();

    els = fixture.debugElement.queryAll(By.css('md-list-item.selected'));
    expect(els.length).toBe(0, 'no item should be selected');

    comp.selectedId = 4;
    fixture.detectChanges();
    els = fixture.debugElement.queryAll(By.css('md-list-item.selected h3'));
    expect(els.length).toBe(1, 'an item should be selected');
    expect(els[0].nativeElement.textContent).toContain('another name', 'another name should be the one selected');
  });

  it('should add a "selected" class to the selected events-views from selid query param route', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, EventsViewsModule, RouterTestingModule],
      providers: [
        { provide: EventsViewsService, useValue: fake EventsViewsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(EventsViewsListComponent);
    comp = fixture.componentInstance;
    eventsViewsService = fixture.debugElement.injector.get(EventsViewsService);

    fixture.detectChanges();
    els = fixture.debugElement.queryAll(By.css('md-list-item.selected'));
    expect(els.length).toBe(1, '1 item should be selected');
    expect(els[0].nativeElement.textContent).toContain('a name', 'a name should be the one selected');

    expect(comp.selectedId).toBe(1);
  });
});
