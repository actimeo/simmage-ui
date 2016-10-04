/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Response, ResponseOptions } from '@angular/http';

import { UsergroupComponent } from './usergroup.component';
import { AppModule } from '../../../app.module';
import { UsergroupsModule } from '../usergroups.module';
import { UsergroupsService } from '../usergroups.service';

import { DbUsergroup } from '../../../db-models/login';
import { DbPortal } from '../../../db-models/portal';
import { DbGroup } from '../../../db-models/organ';

let comp: UsergroupComponent;
let fixture: ComponentFixture<UsergroupComponent>;

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

  addUsergroup () { }
  deleteUsergroup() { }
  updateUsergroup() { }

  loadGroups() {
    return Observable.of([
      {
        grp_id: 1,
        grp_name: 'group 1',
        grp_description: 'description 1',
        org_name: 'organization 1'
      },
      {
        grp_id: 2,
        grp_name: 'group 2',
        grp_description: 'description 2',
        org_name: 'organization 1'
      }
    ]);
  }
  loadPortals() {
    return Observable.of([
      {
        por_id: 1,
        por_name: 'portal 1',
        por_description: 'description 1'
      },
      {
        por_id: 2,
        por_name: 'portal 2',
        por_description: 'the cake is a lie'
      },
      {
        por_id: 3,
        por_name: 'portal 3',
        por_description: 'description 3'
      }
    ]);
  }
  setGroups() { }
  setPortals() { };
}

const fakeUsergroupsService = new FakeUsergroupsService();

const fakeActivatedRoute = {
  data: Observable.of({
    'usergroup' : {
      usergroup : {
        ugr_id: 2,
        ugr_name: 'usergroup 2'
      },
      portals: [
        {
          por_id: 1,
          por_name: 'portal 1',
          por_description: 'description 1'
        },
        {
          por_id: 3,
          por_name: 'portal 3',
          por_description: 'description 3'
        }
      ],
      groups: [
        {
          grp_id: 2,
          grp_name: 'group 2',
          grp_description: 'description 2',
          org_name: 'organ 1'
        }
      ]
    }
  }),
  params: Observable.of({})
};

const fakeActivatedRouteNew = {
  data: Observable.of({}),
  params: Observable.of({})
};

describe('Component: Usergroup', () => {
  it('should display an usergroup', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, UsergroupsModule, RouterTestingModule],
      providers: [
        { provide: UsergroupsService, useValue: fakeUsergroupsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(UsergroupComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    expect(comp.nameCtrl.value).toEqual('usergroup 2');
    expect(comp.groupsCtrl.value.length).toEqual(1, 'you should have one group associated to the usergroup');
    expect(comp.groupsCtrl.value[0]).toEqual(2);
    expect(comp.portalsCtrl.value.length).toEqual(2, 'you should have 2 portals associated to the usergroup');
    expect(comp.portalsCtrl.value[1]).toEqual(3);
  });

  it('should call doCancel when clicking on cancel button', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, UsergroupsModule, RouterTestingModule],
      providers: [
        { provide: UsergroupsService, useValue: fakeUsergroupsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew }
      ]
    });

    fixture = TestBed.createComponent(UsergroupComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const cancelButton = element.querySelectorAll('button')[2];
    expect(cancelButton).not.toBeNull('you should have a button element');
    expect(cancelButton.textContent).toContain('Cancel');

    spyOn(comp, 'doCancel');
    cancelButton.dispatchEvent(new Event('click'));
    expect(comp.doCancel).toHaveBeenCalled();
  });

  it('should call doDelete when clicking on delete button', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, UsergroupsModule, RouterTestingModule],
      providers: [
        { provide: UsergroupsService, useValue: fakeUsergroupsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(UsergroupComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const deleteButton = element.querySelectorAll('button')[2];
    expect(deleteButton).not.toBeNull('you should have a button element');
    expect(deleteButton.textContent).toContain('Delete');

    spyOn(comp, 'doDelete');
    deleteButton.dispatchEvent(new Event('click'));
    expect(comp.doDelete).toHaveBeenCalled();
  });

  it('should display error on delete error', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, UsergroupsModule, RouterTestingModule],
      providers: [
        { provide: UsergroupsService, useValue: fakeUsergroupsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(UsergroupComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const deleteButton = element.querySelectorAll('button')[2];
    expect(deleteButton).not.toBeNull('you should have a button element');
    expect(deleteButton.textContent).toContain('Delete');

    const resp = new Response(new ResponseOptions());
    const subj = new Subject();
    spyOn(comp.ugs, 'deleteUsergroup').and.returnValue(subj);
    subj.error(resp);

    deleteButton.dispatchEvent(new Event('click'));
    expect(comp.errorMsg).toEqual('Error while deleting an usergroup');
  });

  it('canDeactivate should return true if no changes where done', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, UsergroupsModule, RouterTestingModule],
      providers: [
        { provide: UsergroupsService, useValue: fakeUsergroupsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(UsergroupComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    let ret = comp.canDeactivate();
    fixture.detectChanges();

    expect(ret).toEqual(true);
    expect(comp.pleaseSave).toEqual(false);
  });

  it('canDeactivate should return false if changes where made', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, UsergroupsModule, RouterTestingModule],
      providers: [
        { provide: UsergroupsService, useValue: fakeUsergroupsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(UsergroupComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
    comp.nameCtrl.setValue('Value haz changed');

    let ret = comp.canDeactivate();
    fixture.detectChanges();

    expect(ret).toEqual(false);
    expect(comp.pleaseSave).toEqual(true);
  });

  it('should add a new usergroup and return its new id on submit', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, UsergroupsModule, RouterTestingModule],
      providers: [
        { provide: UsergroupsService, useValue: fakeUsergroupsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew }
      ]
    });

    fixture = TestBed.createComponent(UsergroupComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(comp.ugs, 'addUsergroup').and.returnValue(Observable.of(1));
    spyOn(comp.ugs, 'setGroups').and.returnValue(Observable.of(true));
    spyOn(comp.ugs, 'setPortals').and.returnValue(Observable.of(true));

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));

    fixture.detectChanges();
    expect(comp.id).toEqual(1);
  });

  it('should display and error message when error occurs on add submit', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, UsergroupsModule, RouterTestingModule],
      providers: [
        { provide: UsergroupsService, useValue: fakeUsergroupsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew }
      ]
    });

    fixture = TestBed.createComponent(UsergroupComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    const resp = new Response(new ResponseOptions({ body: 'error !'}));
    const subj = new Subject();
    spyOn(comp.ugs, 'addUsergroup').and.returnValue(subj);
    subj.error(resp);

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(comp.errorDetails).toEqual('error !');
    expect(comp.errorMsg).toEqual('Error while adding usergroup');
  });
});
