/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import '../../../rxjs_operators';

import { UsergroupsListComponent } from './usergroups-list.component';
import { AppModule } from '../../../app.module';
import { UsergroupsModule } from '../usergroups.module';
import { UsergroupsService } from '../usergroups.service';

import { DbUsergroup } from '../../../db-models/login';
import { DbPortal } from '../../../db-models/portal';
import { DbGroup } from '../../../db-models/organ';

let comp: UsergroupsListComponent;
let fixture: ComponentFixture<UsergroupsListComponent>;
let els: DebugElement[];
let usergroupsService: UsergroupsService;

class UsergroupData {
  usergroup: DbUsergroup;

  portals: DbPortal[];
  groups: DbGroup[];
}

class FakeUsergroupsService {
  usergroupsDataObserver: Subject<UsergroupData[]>;
  usergroupsDataState: Observable<UsergroupData[]>;

  datas: UsergroupData[] = [];

  constructor() {
    this.usergroupsDataObserver = new Subject<UsergroupData[]>();
    this.usergroupsDataState = this.usergroupsDataObserver.asObservable();

    for (let i = 1; i < 4; i++) {
      let ugd = new UsergroupData();

      ugd.usergroup = {
        ugr_id: i,
        ugr_name: 'usergroup ' + i
      };

      let grp = [];
      let prt = [];
      for (let j = 1; j < i + 1; j++) {
        grp.push({
          grp_id: j,
          grp_name: 'group ' + j,
          grp_description: 'description ' + j,
          org_name: 'organization ' + i
        });

        prt.push({
          por_id: j,
          por_name: 'portal ' + j,
          por_description: 'description ' + j
        });
      }
      ugd.groups = grp;
      ugd.portals = prt;

      this.datas.push(ugd);
    }
  }

  loadUsergroups() {
    this.usergroupsDataObserver.next(this.datas);
  }
}

const fakeUsergroupsService = new FakeUsergroupsService();

const fakeActivatedRoute = {
  params: Observable.of({ toto: 'titi', 'selid': '1'})
};

const fakeActivatedRouteWithoutSel = {
  params: Observable.of({ toto: 'titi' })
};

describe('Component: UsergroupsList', () => {
  it('should get a list of usergroups', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, UsergroupsModule, RouterTestingModule],
      providers: [
        { provide: UsergroupsService, useValue: fakeUsergroupsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(UsergroupsListComponent);
    comp = fixture.componentInstance;
    usergroupsService = fixture.debugElement.injector.get(UsergroupsService);

    fixture.detectChanges();

    expect(comp.usergroupsData.length).toBe(3, 'usergroupsData length should be 3');

    els = fixture.debugElement.queryAll(By.css('.app-card-content'));
    expect(els.length).toBe(3, 'you should have 3 list items in your template');

    els = fixture.debugElement.queryAll(By.css('.app-card-content md-card-title'));
    expect(els[1].nativeElement.textContent).toContain('usergroup 2', 'Second item name should be usergroup 2');
  });

  it('should subscribe/unsubscribe to usergrouplist and route', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, UsergroupsModule, RouterTestingModule],
      providers: [
        { provide: UsergroupsService, useValue: fakeUsergroupsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(UsergroupsListComponent);
    comp = fixture.componentInstance;
    usergroupsService = fixture.debugElement.injector.get(UsergroupsService);

    fixture.detectChanges();

    expect(comp.ugrSubscription).not.toBeNull('...');
    expect(comp.paramSub).not.toBeNull('...');
    expect(comp.ugrSubscription).toEqual(jasmine.any(Subscription));
    expect(comp.paramSub).toEqual(jasmine.any(Subscription));

    spyOn(comp.ugrSubscription, 'unsubscribe');
    spyOn(comp.paramSub, 'unsubscribe');
    comp.ngOnDestroy();

    expect(comp.ugrSubscription.unsubscribe).toHaveBeenCalled();
    expect(comp.paramSub.unsubscribe).toHaveBeenCalled();
  });

  it('should add a "selected" class to the selected usergroup', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, UsergroupsModule, RouterTestingModule],
      providers: [
        { provide: UsergroupsService, useValue: fakeUsergroupsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteWithoutSel }
      ]
    });

    fixture = TestBed.createComponent(UsergroupsListComponent);
    comp = fixture.componentInstance;
    usergroupsService = fixture.debugElement.injector.get(UsergroupsService);

    fixture.detectChanges();

    els = fixture.debugElement.queryAll(By.css('.app-card-content.selected'));
    expect(els.length).toBe(0, 'no card should be selected');

    comp.selectedId = 3;
    fixture.detectChanges();
    els = fixture.debugElement.queryAll(By.css('.app-card-content.selected md-card-title'));
    expect(els.length).toBe(1, 'one item should be selected');
    expect(els[0].nativeElement.textContent).toContain('usergroup 3', 'usergroup 3 should be the one selected');
  });

  it('should add a "selected" class to the selected usergroup from selid query param route', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, UsergroupsModule, RouterTestingModule],
      providers: [
        { provide: UsergroupsService, useValue: fakeUsergroupsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(UsergroupsListComponent);
    comp = fixture.componentInstance;
    usergroupsService = fixture.debugElement.injector.get(UsergroupsService);

    fixture.detectChanges();
    els = fixture.debugElement.queryAll(By.css('.app-card-content.selected'));
    expect(els.length).toBe(1, 'one item should be selected');
    expect(els[0].nativeElement.textContent).toContain('usergroup 1', 'usergroup 1 should be the one selected');
    expect(comp.selectedId).toBe(1);
  });

  it('an usergroup should have two sub lists of both groups and portals', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, UsergroupsModule, RouterTestingModule],
      providers: [
        { provide: UsergroupsService, useValue: fakeUsergroupsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(UsergroupsListComponent);
    comp = fixture.componentInstance;
    usergroupsService = fixture.debugElement.injector.get(UsergroupsService);

    fixture.detectChanges();
    els = fixture.debugElement.queryAll(By.css('.app-card-content.selected ul'));
    expect(els.length).toBe(2, 'you should have two sub lists');

    comp.selectedId = 2;
    fixture.detectChanges();

    els = fixture.debugElement.queryAll(By.css('.app-card-content.selected'));
    expect(els[0].nativeElement.textContent).toContain('usergroup 2');

    els = fixture.debugElement.queryAll(By.css('.app-card-content.selected li'));
    expect(els.length).toBe(4, 'you should have 4 items (2 items per sub list)');
  });
});
