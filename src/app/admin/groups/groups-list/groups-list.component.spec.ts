/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import '../../../rxjs_operators';

import { GroupsListComponent } from './groups-list.component';
import { AppModule } from '../../../app.module';
import { GroupsModule } from '../groups.module';

let comp: GroupsListComponent;
let fixture: ComponentFixture<GroupsListComponent>;
let els: DebugElement[];

const routeData = {
  list: [
    {
      grp_id: 1,
      grp_name: 'Group 1',
      grp_description: 'Description 1'
    },
    {
      grp_id: 3,
      grp_name: 'Group 3',
      grp_description: 'Description 3'
    }
  ]
};

const fakeActivatedRoute = {
  params: Observable.of({ toto: 'titi', 'selid': '1' }),
  data: Observable.of(routeData)
};

const fakeActivatedRouteWithoutSel = {
  params: Observable.of({ toto: 'titi' }),
  data: Observable.of(routeData)
};

describe('Component: GroupsList', () => {
  it('should get a list of groups', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, GroupsModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(GroupsListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    comp.groupsData.subscribe(r => {
      expect(r.length).toBe(2, 'groupsData length should be 2');
    });

    els = fixture.debugElement.queryAll(By.css('md-list-item'));
    expect(els.length).toBe(2, 'you should have 2 list items in your template');

    els = fixture.debugElement.queryAll(By.css('h3.mod-sidenav'));
    expect(els[0].nativeElement.textContent).toContain('Group 1', 'First item name should be Group 1');

    els = fixture.debugElement.queryAll(By.css('p.mod-sidenav'));
    expect(els[1].nativeElement.textContent).toContain('Description 3', 'Second item description should be Description 3');
  });

  it('should add a "selected" class to the selected group', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, GroupsModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(GroupsListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    comp.selectedId.subscribe(s => expect(s).toBe('1'));
    fixture.detectChanges();
    els = fixture.debugElement.queryAll(By.css('md-list-item.selected h3'));
    expect(els.length).toBe(1, 'one item should be selected');
    expect(els[0].nativeElement.textContent).toContain('Group 1', 'Group should the selected group');
  });

  it('should not add a "selected" class to selected group', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, GroupsModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRouteWithoutSel }
      ]
    });

    fixture = TestBed.createComponent(GroupsListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    comp.selectedId.subscribe(s => expect(s).toBe(undefined));
  });

  it('should get a list of groups', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, GroupsModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(GroupsListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    els = fixture.debugElement.queryAll(By.css('md-list-item.selected'));
    expect(els.length).toBe(1, '1 item should be selected');
    expect(els[0].nativeElement.textContent).toContain('Group 1', 'Group 1 should be the selected group');

    comp.selectedId.subscribe(s => expect(s).toBe('1'));
  });
});
