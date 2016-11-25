/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import '../../../rxjs_operators';

import { NotesViewsListComponent } from './notes-views-list.component';
import { AppModule } from '../../../app.module';
import { NotesViewsModule } from '../notes-views.module';

let comp: NotesViewsListComponent;
let fixture: ComponentFixture<NotesViewsListComponent>;
let els: DebugElement[];

const listData = [
  {
    nov_id: 1,
    nov_name: 'a name'
  },
  {
    nov_id: 4,
    nov_name: 'another name'
  }
];

const fakeActivatedRoute = {
  params: Observable.of({ toto: 'titi', 'selid': '1' }),
  data: Observable.of({ list: listData })
};

const fakeActivatedRouteWithoutSel = {
  params: Observable.of({ toto: 'titi' }),
  data: Observable.of({ list: listData })
};

describe('Component: NotesViewsList', () => {
  it('should get a list of Notes-views', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, NotesViewsModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(NotesViewsListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    comp.notesViewsData.subscribe(r => {
      expect(r.length).toBe(2, 'notes-viewsData length should be 2');
    });

    els = fixture.debugElement.queryAll(By.css('md-list-item'));
    expect(els.length).toBe(2, 'you should have 2 list items in your template');

    els = fixture.debugElement.queryAll(By.css('h3.mod-sidenav'));
    expect(els[0].nativeElement.textContent).toContain('a name', 'First item name should be a name');
  });

  it('should add a "selected" class to the selected notes-views from selid query param route', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, NotesViewsModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(NotesViewsListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    els = fixture.debugElement.queryAll(By.css('md-list-item.selected'));
    expect(els.length).toBe(1, '1 item should be selected');
    expect(els[0].nativeElement.textContent).toContain('a name', 'a name should be the one selected');

    comp.selectedId.subscribe(s => expect(s).toBe('1'));
  });
});
