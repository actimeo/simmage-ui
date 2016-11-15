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
import { EventsTypesService, EventsTypesListDetails } from '../events-types.service';
import { EventsTypesListData } from '../events-types-list-resolve.guard';
import { EnumsService } from '../../../shared/enums.service';

let comp: EventsTypesListComponent;
let fixture: ComponentFixture<EventsTypesListComponent>;
let els: DebugElement[];
let eventsTypesService: EventsTypesService;


const routeData: { list: EventsTypesListData } = {
  list: {
    eventsTypes: [
      {
        eventType: {
          ety_id: 1,
          ety_name: 'a name',
          top_ids: [],
          org_ids: []
        }, topics: [], organizations: []
      } as EventsTypesListDetails,
      {
        eventType: {
          ety_id: 4,
          ety_name: 'another name',
          top_ids: [],
          org_ids: []
        }, topics: [], organizations: []
      } as EventsTypesListDetails
    ],
    topics: [],
    organs: []
  }
};

const fakeActivatedRoute = {
  params: Observable.of({ toto: 'titi', 'selid': '1' }),
  data: Observable.of(routeData)
};


const fakeActivatedRouteIncident = {
  params: Observable.of({ toto: 'titi', 'selid': '1', cat: 'incident' }),
  data: Observable.of(routeData)
};

const fakeActivatedRouteWithoutSel = {
  params: Observable.of({ toto: 'titi', cat: 'incident' }),
  data: Observable.of(routeData)
};

class FakeEnumsService {
  enum_list(enumobj: string): Observable<string[]> {
    return Observable.of(['cat1', 'cat2']);
  }
}

describe('Component: EventsTypesList', () => {
  it('should get a list of events-types', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, EventsTypesModule, RouterTestingModule],
      providers: [
        { provide: EnumsService, useClass: FakeEnumsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteIncident }
      ]
    });

    fixture = TestBed.createComponent(EventsTypesListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    comp.eventsTypesData.subscribe(r => {
      expect(r.eventsTypes.length).toBe(2, 'events-typesData length should be 2');
    });

    els = fixture.debugElement.queryAll(By.css('md-card'));
    expect(els.length).toBe(2, 'you should have 2 list items in your template');

    els = fixture.debugElement.queryAll(By.css('md-card-title'));
    expect(els[0].nativeElement.textContent).toContain('a name', 'First item name should be a name');
  });

  it('should add a "selected" class to the selected events-types', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, EventsTypesModule, RouterTestingModule],
      providers: [
        { provide: EnumsService, useClass: FakeEnumsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteWithoutSel }
      ]
    });

    fixture = TestBed.createComponent(EventsTypesListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    els = fixture.debugElement.queryAll(By.css('md-card.selected'));
    expect(els.length).toBe(0, 'no item should be selected');

    comp.selectedId = Observable.of(4);
    fixture.detectChanges();
    els = fixture.debugElement.queryAll(By.css('md-card.selected md-card-title'));
    expect(els.length).toBe(1, 'an item should be selected');
    expect(els[0].nativeElement.textContent).toContain('another name', 'another name should be the one selected');
  });

  it('should add a "selected" class to the selected events-types from selid query param route', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, EventsTypesModule, RouterTestingModule],
      providers: [
        { provide: EnumsService, useClass: FakeEnumsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteIncident }
      ]
    });

    fixture = TestBed.createComponent(EventsTypesListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    els = fixture.debugElement.queryAll(By.css('md-card.selected'));
    expect(els.length).toBe(1, '1 item should be selected');
    expect(els[0].nativeElement.textContent).toContain('a name', 'a name should be the one selected');

    comp.selectedId.subscribe(s => expect(s).toBe('1'));
  });

  it('should create an ag-grid when toggling tabular switch', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, EventsTypesModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRouteIncident }
      ]
    });

    fixture = TestBed.createComponent(EventsTypesListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    els = fixture.debugElement.queryAll(By.css('md-slide-toggle'));
    expect(els).not.toBe(null, 'You should have a slider to toggle tabular mode');

    spyOn(comp, 'createRowData');
    comp.setTabular(true);
    fixture.detectChanges();
 
    expect(comp.createRowData).toHaveBeenCalled();
  });
});
