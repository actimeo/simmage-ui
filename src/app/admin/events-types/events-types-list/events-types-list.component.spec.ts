import { PreferencesService } from './../../../services/utils/preferences.service';
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
import { EventsTypesListData, EventsTypesListResolve } from '../events-types-list-resolve.guard';
import { EnumsService } from '../../../services/backend/enums.service';

let comp: EventsTypesListComponent;
let fixture: ComponentFixture<EventsTypesListComponent>;
let els: DebugElement[];

class FakeEventsTypesService {
  loadEventsTypesDetails(id) {
    return Observable.of({
      ety_id: 1,
      ety_name: 'a name',
      ety_category: 'category',
      ety_individual_name: true,
      topics: [],
      organizations: []
    });
  }

  getEventTypes(id) { }

  updateEventsTypes(id, name, category, individualName, topics, organizations) {
    routeData.list.eventsTypes.filter(e => e.eventType.ety_id === id).map(e => {
      e.eventType.ety_name = name;
      e.eventType.ety_category = category;
      e.eventType.ety_individual_name = individualName;
      e.eventType.top_ids = topics;
      e.eventType.org_ids = organizations;
    });
    return Observable.of(true);
  }

  addEventsTypes() { }
  deleteEventsTypes() { }
  loadEventsTypes() { }
  getTopics() {
    return Observable.of({});
  }
  getOrganizations() {
    return Observable.of(true);
  }
}

const fakeEventsTypesService = new FakeEventsTypesService();

const routeData: { list: EventsTypesListData } = {
  list: {
    eventsTypes: [
      {
        eventType: {
          ety_id: 1,
          ety_name: 'a name',
          ety_category: 'incident',
          top_ids: [],
          org_ids: []
        }, topics: [], organizations: []
      } as EventsTypesListDetails,
      {
        eventType: {
          ety_id: 2,
          ety_name: 'a 2nd name',
          ety_category: 'incident',
          top_ids: [1],
          org_ids: []
        }, topics: [], organizations: []
      } as EventsTypesListDetails,
      {
        eventType: {
          ety_id: 3,
          ety_name: 'a 3rd name',
          ety_category: 'incident',
          top_ids: [],
          org_ids: []
        }, topics: [], organizations: []
      } as EventsTypesListDetails,
      {
        eventType: {
          ety_id: 4,
          ety_name: 'another name',
          ety_category: 'incident',
          top_ids: [],
          org_ids: [2]
        }, topics: [], organizations: []
      } as EventsTypesListDetails
    ],
    topics: [
      {
        top_id: 1,
        top_name: 'Health',
        top_description: '',
        top_icon: 'health',
        top_color: 'blue'
      },
      {
        top_id: 2,
        top_name: 'Financer',
        top_description: '',
        top_icon: 'financer',
        top_color: 'white'
      }
    ],
    organs: [
      {
        org_id: 1,
        org_name: 'Organization 1',
        org_description: 'Description 1',
        org_internal: true
      },
      {
        org_id: 2,
        org_name: 'Organization 2',
        org_description: 'Description 2',
        org_internal: true
      }
    ]
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

class FakeEventsTypesListResolve {
  getData() {
    return Observable.of(routeData.list);
  }
}

class FakeEnumsService {
  enum_list(enumobj: string): Observable<string[]> {
    return Observable.of(['cat1', 'cat2']);
  }
}

class FakePreferencesService {
  getPrefBoolean(a, b) {
    return false;
  }
  setPrefBoolean(a, b, v) { }
}

describe('Component: EventsTypesList', () => {
  it('should get a list of events-types', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, EventsTypesModule, RouterTestingModule],
      providers: [
        { provide: PreferencesService, useClass: FakePreferencesService },
        { provide: EnumsService, useClass: FakeEnumsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteIncident },
        { provide: EventsTypesListResolve, useClass: FakeEventsTypesListResolve },
      ]
    });

    fixture = TestBed.createComponent(EventsTypesListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    comp.eventsTypesData.subscribe(r => {
      expect(r.eventsTypes.length).toBe(4, 'events-typesData length should be 4');
    });

    els = fixture.debugElement.queryAll(By.css('md-card'));
    expect(els.length).toBe(4, 'you should have 4 list items in your template');

    els = fixture.debugElement.queryAll(By.css('md-card-title'));
    expect(els[0].nativeElement.textContent).toContain('a name', 'First item name should be a name');
  });

  it('should add a "selected" class to the selected events-types', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, EventsTypesModule, RouterTestingModule],
      providers: [
        { provide: PreferencesService, useClass: FakePreferencesService },
        { provide: EnumsService, useClass: FakeEnumsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteWithoutSel },
        { provide: EventsTypesListResolve, useClass: FakeEventsTypesListResolve },
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
        { provide: PreferencesService, useClass: FakePreferencesService },
        { provide: EnumsService, useClass: FakeEnumsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteIncident },
        { provide: EventsTypesListResolve, useClass: FakeEventsTypesListResolve },
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
        { provide: PreferencesService, useClass: FakePreferencesService },
        { provide: EnumsService, useClass: FakeEnumsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteIncident },
        { provide: EventsTypesListResolve, useClass: FakeEventsTypesListResolve },
      ]
    });

    fixture = TestBed.createComponent(EventsTypesListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    els = fixture.debugElement.queryAll(By.css('md-slide-toggle'));
    expect(els).not.toBe(null, 'You should have a slider to toggle tabular mode');

    comp.setTabular(true);
    fixture.detectChanges();

    els = fixture.nativeElement.querySelectorAll('.ag-body-viewport .ag-row');
    expect(els).not.toBe(null, 'you should have a grid');
    expect(els.length).toBe(4, 'you should have a grid with 4 rows');
  });

  it('should update and add an organization linked to an event type', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, EventsTypesModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRouteIncident },
        { provide: EventsTypesService, useValue: fakeEventsTypesService },
        { provide: EventsTypesListResolve, useClass: FakeEventsTypesListResolve },
        { provide: EnumsService, useClass: FakeEnumsService }
      ]
    });

    fixture = TestBed.createComponent(EventsTypesListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    comp.setTabular(true);
    fixture.detectChanges();

    let checkbox = fixture.nativeElement.querySelector('.ag-body-viewport .ag-row ng-component input');
    expect(checkbox.checked).toBe(false, 'checkbox should be unchecked');
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(checkbox.checked).toBe(true, 'checkbox should be checked now');

    comp.eventsTypesData.subscribe(r => {
      expect(r.eventsTypes[0].eventType.org_ids.length).toBe(1, 'document "a name" should be linked to 1 organization');
      expect(r.eventsTypes[0].eventType.org_ids).toBe(routeData.list.eventsTypes[0].eventType.org_ids, 'document "a name" should be linked to "organization 1"');
    });
  });

  it('should update and remove an organization linked to an event type', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, EventsTypesModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRouteIncident },
        { provide: EventsTypesService, useValue: fakeEventsTypesService },
        { provide: EventsTypesListResolve, useClass: FakeEventsTypesListResolve },
        { provide: EnumsService, useClass: FakeEnumsService }
      ]
    });

    fixture = TestBed.createComponent(EventsTypesListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    comp.setTabular(true);
    fixture.detectChanges();

    let checkbox = fixture.nativeElement.querySelectorAll('.ag-body-viewport .ag-row ng-component input')[13]; // document 4 organization 2
    expect(checkbox.checked).toBe(true, 'checkbox should be checked');
    checkbox.checked = false;
    checkbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(checkbox.checked).toBe(false, 'checkbox should be unchecked now');

    comp.eventsTypesData.subscribe(r => {
      expect(r.eventsTypes[3].eventType.org_ids.length).toBe(0, 'length should be 0');
      expect(r.eventsTypes[3].eventType.org_ids).toBe(routeData.list.eventsTypes[3].eventType.org_ids, 'document type 4 should have no organization');
    });
  });

  it('should update and add a topic linked to an event type', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, EventsTypesModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRouteIncident },
        { provide: EventsTypesService, useValue: fakeEventsTypesService },
        { provide: EventsTypesListResolve, useClass: FakeEventsTypesListResolve },
        { provide: EnumsService, useClass: FakeEnumsService }
      ]
    });

    fixture = TestBed.createComponent(EventsTypesListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    comp.setTabular(true);
    fixture.detectChanges();

    let checkbox = fixture.nativeElement.querySelectorAll('.ag-body-viewport .ag-row ng-component input')[10]; // document 3 topic 1
    expect(checkbox.checked).toBe(false, 'checkbox should be unchecked');
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(checkbox.checked).toBe(true, 'checkbox should be checked now');

    comp.eventsTypesData.subscribe(r => {
      expect(r.eventsTypes[2].eventType.top_ids.length).toBe(1, 'document "a name" should be linked to 1 topic');
      expect(r.eventsTypes[2].eventType.top_ids).toBe(routeData.list.eventsTypes[2].eventType.top_ids, 'document "a 3rd name" should be linked to "topic 1"');
    });
  });

  it('should update and remove a topic linked to an event type', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, EventsTypesModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRouteIncident },
        { provide: EventsTypesService, useValue: fakeEventsTypesService },
        { provide: EventsTypesListResolve, useClass: FakeEventsTypesListResolve },
        { provide: EnumsService, useClass: FakeEnumsService }
      ]
    });

    fixture = TestBed.createComponent(EventsTypesListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    comp.setTabular(true);
    fixture.detectChanges();

    let checkbox = fixture.nativeElement.querySelectorAll('.ag-body-viewport .ag-row ng-component input')[6]; // document 2 topic 1
    expect(checkbox.checked).toBe(true, 'checkbox should be checked');
    checkbox.checked = false;
    checkbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(checkbox.checked).toBe(false, 'checkbox should be unchecked now');

    comp.eventsTypesData.subscribe(r => {
      expect(r.eventsTypes[1].eventType.top_ids.length).toBe(0, 'length should be 0');
      expect(r.eventsTypes[1].eventType.top_ids).toBe(routeData.list.eventsTypes[1].eventType.top_ids, 'document type 2 should have no topic');
    });
  });
});
