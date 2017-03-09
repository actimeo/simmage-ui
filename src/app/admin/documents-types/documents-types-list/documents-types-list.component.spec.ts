import { PreferencesService } from './../../../services/utils/preferences.service';
/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import '../../../rxjs_operators';

import { DocumentsTypesListComponent } from './documents-types-list.component';
import { AppModule } from '../../../app.module';
import { DocumentsTypesModule } from '../documents-types.module';
import { DocumentsTypesService, DocumentsTypesListDetails } from '../documents-types.service';
import { DocumentsTypesListData, DocumentsTypesListResolve } from '../documents-types-list-resolve.guard';

let comp: DocumentsTypesListComponent;
let fixture: ComponentFixture<DocumentsTypesListComponent>;
let els: DebugElement[];

const routeData: { list: DocumentsTypesListData } = {
  list: {
    documentsTypes: [
      {
        documentType: {
          dty_id: 1,
          dty_name: 'a name',
          top_ids: [],
          org_ids: []
        }, topics: [], organizations: []
      } as DocumentsTypesListDetails,
      {
        documentType: {
          dty_id: 2,
          dty_name: 'a 2nd name',
          top_ids: [1],
          org_ids: []
        }, topics: [], organizations: []
      } as DocumentsTypesListDetails,
      {
        documentType: {
          dty_id: 3,
          dty_name: 'a 3rd name',
          top_ids: [],
          org_ids: []
        }, topics: [], organizations: []
      } as DocumentsTypesListDetails,
      {
        documentType: {
          dty_id: 4,
          dty_name: 'another name',
          top_ids: [],
          org_ids: [2]
        }, topics: [], organizations: []
      } as DocumentsTypesListDetails
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

class FakeDocumentsTypesService {
  loadDocumentsTypesDetails(id) {
    return Observable.of({
      dty_id: 1,
      dty_name: 'a name',
      dty_individual_name: true,
      topics: [],
      organizations: []
    });
  }

  getDocumentsTypes(id) { }

  updateDocumentsTypes(id, name, individualName, topics, organizations) {
    routeData.list.documentsTypes.filter(d => d.documentType.dty_id === id).map(d => {
      d.documentType.dty_name = name;
      d.documentType.dty_individual_name = individualName;
      d.documentType.top_ids = topics;
      d.documentType.org_ids = organizations;
    });
    return Observable.of(true);
  }

  addDocumentsTypes() { }
  deleteDocumentsTypes() { }
  loadDocumentsTypes() { }
  getTopics() {
    return Observable.of({});
  }
  getOrganizations() {
    return Observable.of({});
  }
}

const fakeDocumentsTypesService = new FakeDocumentsTypesService();

const fakeActivatedRoute = {
  params: Observable.of({ toto: 'titi', 'selid': '1' }),
  data: Observable.of(routeData)
};


const fakeActivatedRouteIncident = {
  params: Observable.of({ toto: 'titi', 'selid': '1' }),
  data: Observable.of(routeData)
};

const fakeActivatedRouteWithoutSel = {
  params: Observable.of({ toto: 'titi' }),
  data: Observable.of(routeData)
};

class FakeDocumentsTypesListResolve {
  getData() {
    return Observable.of(routeData.list);
  }
}

class FakePreferencesService {
  getPrefBoolean(a, b) {
    return false;
  }
  setPrefBoolean(a, b, v) { }
}

describe('Component: DocumentsTypesList', () => {
  it('should get a list of documents-types', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, DocumentsTypesModule, RouterTestingModule],
      providers: [
        { provide: DocumentsTypesListResolve, useClass: FakeDocumentsTypesListResolve },
        { provide: PreferencesService, useClass: FakePreferencesService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteIncident },
        { provide: DocumentsTypesService, useValue: fakeDocumentsTypesService }
      ]
    });

    fixture = TestBed.createComponent(DocumentsTypesListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    comp.documentsTypesData.subscribe(r => {
      expect(r.documentsTypes.length).toBe(4, 'documents-typesData length should be 2');
    });

    els = fixture.debugElement.queryAll(By.css('md-card'));
    expect(els.length).toBe(4, 'you should have 4 cards in your template');

    els = fixture.debugElement.queryAll(By.css('md-card-title'));
    expect(els[0].nativeElement.textContent).toContain('a name', 'First item name should be a name');
  });

  it('should add a "selected" class to the selected documents-types', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, DocumentsTypesModule, RouterTestingModule],
      providers: [
        { provide: DocumentsTypesListResolve, useClass: FakeDocumentsTypesListResolve },
        { provide: PreferencesService, useClass: FakePreferencesService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteWithoutSel },
        { provide: DocumentsTypesService, useValue: fakeDocumentsTypesService }
      ]
    });

    fixture = TestBed.createComponent(DocumentsTypesListComponent);
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

  it('should add a "selected" class to the selected documents-types from selid query param route', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, DocumentsTypesModule, RouterTestingModule],
      providers: [
        { provide: DocumentsTypesListResolve, useClass: FakeDocumentsTypesListResolve },
        { provide: PreferencesService, useClass: FakePreferencesService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteIncident },
        { provide: DocumentsTypesService, useValue: fakeDocumentsTypesService }
      ]
    });

    fixture = TestBed.createComponent(DocumentsTypesListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    els = fixture.debugElement.queryAll(By.css('md-card.selected'));
    expect(els.length).toBe(1, '1 item should be selected');
    expect(els[0].nativeElement.textContent).toContain('a name', 'a name should be the one selected');

    comp.selectedId.subscribe(s => expect(s).toBe('1'));
  });

  it('should create an ag-grid when toggling tabular switch', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, DocumentsTypesModule, RouterTestingModule],
      providers: [
        { provide: DocumentsTypesListResolve, useClass: FakeDocumentsTypesListResolve },
        { provide: PreferencesService, useClass: FakePreferencesService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteIncident },
        { provide: DocumentsTypesService, useValue: fakeDocumentsTypesService }
      ]
    });

    fixture = TestBed.createComponent(DocumentsTypesListComponent);
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

  it('should update and add an organization linked to a document type', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, DocumentsTypesModule, RouterTestingModule],
      providers: [
        { provide: DocumentsTypesListResolve, useClass: FakeDocumentsTypesListResolve },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: DocumentsTypesService, useValue: fakeDocumentsTypesService }
      ]
    });

    fixture = TestBed.createComponent(DocumentsTypesListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    comp.setTabular(true);
    fixture.detectChanges();

    const checkbox = fixture.nativeElement.querySelector('.ag-body-viewport .ag-row ng-component input');
    expect(checkbox.checked).toBe(false, 'checkbox should be unchecked');
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(checkbox.checked).toBe(true, 'checkbox should be checked now');

    comp.documentsTypesData.subscribe(r => {
      expect(r.documentsTypes[0].documentType.org_ids.length).toBe(1, 'document "a name" should be linked to 1 organization');
      expect(r.documentsTypes[0].documentType.org_ids)
        .toBe(routeData.list.documentsTypes[0].documentType.org_ids, 'document "a name" should be linked to "organization 1"');
    });
  });

  it('should update and remove an organization linked to a document type', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, DocumentsTypesModule, RouterTestingModule],
      providers: [
        { provide: DocumentsTypesListResolve, useClass: FakeDocumentsTypesListResolve },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: DocumentsTypesService, useValue: fakeDocumentsTypesService }
      ]
    });

    fixture = TestBed.createComponent(DocumentsTypesListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    comp.setTabular(true);
    fixture.detectChanges();

    const checkbox = fixture.nativeElement
      .querySelectorAll('.ag-body-viewport .ag-row ng-component input')[13]; // document 4 organization 2
    expect(checkbox.checked).toBe(true, 'checkbox should be checked');
    checkbox.checked = false;
    checkbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(checkbox.checked).toBe(false, 'checkbox should be unchecked now');

    comp.documentsTypesData.subscribe(r => {
      expect(r.documentsTypes[3].documentType.org_ids.length).toBe(0, 'length should be 0');
      expect(r.documentsTypes[3].documentType.org_ids)
        .toBe(routeData.list.documentsTypes[3].documentType.org_ids, 'document type 4 should have no organization');
    });
  });

  it('should update and add a topic linked to a document type', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, DocumentsTypesModule, RouterTestingModule],
      providers: [
        { provide: DocumentsTypesListResolve, useClass: FakeDocumentsTypesListResolve },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: DocumentsTypesService, useValue: fakeDocumentsTypesService }
      ]
    });

    fixture = TestBed.createComponent(DocumentsTypesListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    comp.setTabular(true);
    fixture.detectChanges();

    const checkbox = fixture.nativeElement.querySelectorAll('.ag-body-viewport .ag-row ng-component input')[10]; // document 3 topic 1
    expect(checkbox.checked).toBe(false, 'checkbox should be unchecked');
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(checkbox.checked).toBe(true, 'checkbox should be checked now');

    comp.documentsTypesData.subscribe(r => {
      expect(r.documentsTypes[2].documentType.top_ids.length).toBe(1, 'document "a name" should be linked to 1 topic');
      expect(r.documentsTypes[2].documentType.top_ids)
        .toBe(routeData.list.documentsTypes[2].documentType.top_ids, 'document "a 3rd name" should be linked to "topic 1"');
    });
  });

  it('should update and remove a topic linked to a document type', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, DocumentsTypesModule, RouterTestingModule],
      providers: [
        { provide: DocumentsTypesListResolve, useClass: FakeDocumentsTypesListResolve },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: DocumentsTypesService, useValue: fakeDocumentsTypesService }
      ]
    });

    fixture = TestBed.createComponent(DocumentsTypesListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    comp.setTabular(true);
    fixture.detectChanges();

    const checkbox = fixture.nativeElement.querySelectorAll('.ag-body-viewport .ag-row ng-component input')[6]; // document 2 topic 1
    expect(checkbox.checked).toBe(true, 'checkbox should be checked');
    checkbox.checked = false;
    checkbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(checkbox.checked).toBe(false, 'checkbox should be unchecked now');

    comp.documentsTypesData.subscribe(r => {
      expect(r.documentsTypes[1].documentType.top_ids.length).toBe(0, 'length should be 0');
      expect(r.documentsTypes[1].documentType.top_ids)
        .toBe(routeData.list.documentsTypes[1].documentType.top_ids, 'document type 2 should have no topic');
    });
  });
});
