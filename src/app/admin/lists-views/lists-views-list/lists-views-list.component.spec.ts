/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import '../../../rxjs_operators';

import { ListsViewsListComponent } from './lists-views-list.component';
import { AppModule } from '../../../app.module';
import { ListsViewsModule } from '../lists-views.module';

let comp: ListsViewsListComponent;
let fixture: ComponentFixture<ListsViewsListComponent>;
let els: DebugElement[];


const listData = [
  {
    liv_id: 1,
    liv_name: 'a name'
  },
  {
    liv_id: 4,
    liv_name: 'another name'
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

describe('Component: ListsViewsList', () => {
  it('should get a list of lists-views', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, ListsViewsModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(ListsViewsListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    comp.listsViewsData.subscribe(r => {
      expect(r.length).toBe(2, 'lists-viewsData length should be 2');
    });

    els = fixture.debugElement.queryAll(By.css('md-list-item'));
    expect(els.length).toBe(2, 'you should have 2 list items in your template');

    els = fixture.debugElement.queryAll(By.css('h3.mod-sidenav'));
    expect(els[0].nativeElement.textContent).toContain('a name', 'First item name should be a name');
  });

  it('should add a "selected" class to the selected lists-views from selid query param route', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, ListsViewsModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(ListsViewsListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    els = fixture.debugElement.queryAll(By.css('md-list-item.selected'));
    expect(els.length).toBe(1, '1 item should be selected');
    expect(els[0].nativeElement.textContent).toContain('a name', 'a name should be the one selected');

    comp.selectedId.subscribe(s => expect(s).toBe('1'));
  });
});
