/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
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
import { DocumentsTypesListData } from '../documents-types-list-resolve.guard';

let comp: DocumentsTypesListComponent;
let fixture: ComponentFixture<DocumentsTypesListComponent>;
let els: DebugElement[];
let documentsTypesService: DocumentsTypesService;


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
          dty_id: 4,
          dty_name: 'another name',
          top_ids: [],
          org_ids: []
        }, topics: [], organizations: []
      } as DocumentsTypesListDetails
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
  params: Observable.of({ toto: 'titi', 'selid': '1' }),
  data: Observable.of(routeData)
};

const fakeActivatedRouteWithoutSel = {
  params: Observable.of({ toto: 'titi' }),
  data: Observable.of(routeData)
};

describe('Component: DocumentsTypesList', () => {
  it('should get a list of documents-types', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, DocumentsTypesModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRouteIncident }
      ]
    });

    fixture = TestBed.createComponent(DocumentsTypesListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    comp.documentsTypesData.subscribe(r => {
      expect(r.documentsTypes.length).toBe(2, 'documents-typesData length should be 2');
    });

    els = fixture.debugElement.queryAll(By.css('md-list-item'));
    expect(els.length).toBe(2, 'you should have 2 list items in your template');

    els = fixture.debugElement.queryAll(By.css('h3.mod-sidenav'));
    expect(els[0].nativeElement.textContent).toContain('a name', 'First item name should be a name');
  });

  it('should add a "selected" class to the selected documents-types', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, DocumentsTypesModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRouteWithoutSel }
      ]
    });

    fixture = TestBed.createComponent(DocumentsTypesListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    els = fixture.debugElement.queryAll(By.css('md-list-item.selected'));
    expect(els.length).toBe(0, 'no item should be selected');

    comp.selectedId = Observable.of(4);
    fixture.detectChanges();
    els = fixture.debugElement.queryAll(By.css('md-list-item.selected h3'));
    expect(els.length).toBe(1, 'an item should be selected');
    expect(els[0].nativeElement.textContent).toContain('another name', 'another name should be the one selected');
  });

  it('should add a "selected" class to the selected documents-types from selid query param route', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, DocumentsTypesModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRouteIncident }
      ]
    });

    fixture = TestBed.createComponent(DocumentsTypesListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    els = fixture.debugElement.queryAll(By.css('md-list-item.selected'));
    expect(els.length).toBe(1, '1 item should be selected');
    expect(els[0].nativeElement.textContent).toContain('a name', 'a name should be the one selected');

    comp.selectedId.subscribe(s => expect(s).toBe('1'));
  });
});
