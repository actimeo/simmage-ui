/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import '../../../rxjs_operators';

import { UsersListComponent } from './users-list.component';
import { UsersService } from '../users.service';
import { AppModule } from '../../../app.module';
import { UsersModule } from '../users.module';

import { PreferencesService } from './../../../services/utils/preferences.service';
import { UsersListResolve } from './../users-list-resolve.guard';

let comp: UsersListComponent;
let fixture: ComponentFixture<UsersListComponent>;
let els: DebugElement[];

const routeData = {
  list: {
    users: [
      {
        usr_login: 'user1',
        usr_rights: [],
        par_id: 1,
        par_firstname: 'firstname1',
        par_lastname: 'lastname1',
        ugr_id: 1,
        ugr_name: 'usergroup 1'
      },
      {
        usr_login: 'user2',
        usr_rights: ['right 2'],
        par_id: 2,
        par_firstname: 'firstname2',
        par_lastname: 'lastname2',
        ugr_id: 1,
        ugr_name: 'usergroup 1'
      }
    ],
    usergroups: [
      {
        ugr_id: 1,
        ugr_name: 'usergroup 1'
      },
      {
        ugr_id: 2,
        ugr_name: 'usergroup 2'
      }
    ],
    userRights: ['right 1', 'right 2']
  }
};

class FakeUsersService {
  loadUsers(ugr_id: number) {
    if (ugr_id != null) {
      return Observable.of([
        {
          usr_login: 'user1',
          usr_rights: [],
          par_id: 1,
          par_firstname: 'firstname1',
          par_lastname: 'lastname1',
          ugr_id: 1,
          ugr_name: 'usergroup 1'
        },
        {
          usr_login: 'user2',
          usr_rights: [],
          par_id: 2,
          par_firstname: 'firstname2',
          par_lastname: 'lastname2',
          ugr_id: 2,
          ugr_name: 'usergroup 2'
        }
      ]);
    } else {
      return Observable.of([
        {
          usr_login: 'user3',
          usr_rights: [],
          par_id: 3,
          par_firstname: 'firstname3',
          par_lastname: 'lastname3',
          ugr_id: 1,
          ugr_name: 'usergroup'
        },
        {
          usr_login: 'user4',
          usr_rights: [],
          par_id: 4,
          par_firstname: 'firstname4',
          par_lastname: 'lastname4',
          ugr_id: 1,
          ugr_name: 'usergroup'
        }
      ]);
    }
  }

  addUser() { }
  deleteUser() { }
  updateUser(login: string, rights: string[], participant: number, usergroup: number) {
    routeData.list.users.filter(u => u.usr_login === login).map(u => {
      u.usr_rights = rights;
      u.par_id = participant;
      u.ugr_id = usergroup;
    });
    return Observable.of(true);
  }

  loadUser() { }
  loadUsergroups() {
    return Observable.of([{}]);
  }
  loadParticipants() {
    return Observable.of([{}]);
  }
  getTemporaryPassword(login) {
    return Observable.of('password');
  }
}

const fakeUsersService = new FakeUsersService();

const fakeActivatedRoute = {
  params: Observable.of({ toto: 'titi', 'selusergroup': 1, 'selogin': 'user1' }),
  data: Observable.of(routeData)
};

const fakeActivatedRouteWithoutSel = {
  params: Observable.of({ toto: 'titi' }),
  data: Observable.of(routeData)
};

class FakeUsersListResolve {
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

describe('Component: UsersList', () => {
  it('should get a list of users', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, UsersModule, RouterTestingModule],
      providers: [
        { provide: UsersListResolve, useClass: FakeUsersListResolve },
        { provide: PreferencesService, useClass: FakePreferencesService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: UsersService, useValue: fakeUsersService }
      ]
    });

    fixture = TestBed.createComponent(UsersListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    comp.usersData.subscribe(r => {
      expect(r.users.length).toBe(2, 'userData length should be 2');
    });

    els = fixture.debugElement.queryAll(By.css('md-card'));
    expect(els.length).toBe(2, 'you should have 2 list items in your template');

    els = fixture.debugElement.queryAll(By.css('md-card-title'));
    expect(els[0].nativeElement.textContent)
      .toContain('firstname1 lastname1', 'First item name should be user1 named firstname1 lastname1');
  });

  it('should add a "selected" class to the selected user', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, UsersModule, RouterTestingModule],
      providers: [
        { provide: UsersListResolve, useClass: FakeUsersListResolve },
        { provide: PreferencesService, useClass: FakePreferencesService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: UsersService, useValue: fakeUsersService }
      ]
    });

    fixture = TestBed.createComponent(UsersListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    comp.selectedLogin.subscribe(s => expect(s).toBe('user1'));
    fixture.detectChanges();
    els = fixture.debugElement.queryAll(By.css('md-card.selected'));
    expect(els.length).toBe(1, 'one item should be selected');
    expect(els[0].nativeElement.textContent).toContain('firstname1 lastname1', 'user1 should the selected user');
  });

  it('should not add a "selected" class to selected user', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, UsersModule, RouterTestingModule],
      providers: [
        { provide: UsersListResolve, useClass: FakeUsersListResolve },
        { provide: PreferencesService, useClass: FakePreferencesService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteWithoutSel },
        { provide: UsersService, useValue: fakeUsersService }
      ]
    });

    fixture = TestBed.createComponent(UsersListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    comp.selectedLogin.subscribe(s => expect(s).toBe(undefined));
  });

  it('should create an ag-grid when toggling tabular switch', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, UsersModule, RouterTestingModule],
      providers: [
        { provide: UsersListResolve, useClass: FakeUsersListResolve },
        { provide: PreferencesService, useClass: FakePreferencesService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: UsersService, useValue: fakeUsersService }
      ]
    });

    fixture = TestBed.createComponent(UsersListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    els = fixture.debugElement.queryAll(By.css('md-slide-toggle'));
    fixture.detectChanges();
    expect(els).not.toBe(null, 'You should have a slider to toggle tabular mode');

    comp.setTabular(true);
    fixture.detectChanges();

    els = fixture.nativeElement.querySelectorAll('.ag-body-viewport .ag-row');
    expect(els).not.toBe(null, 'you should have a grid');
    expect(els.length).toBe(2, 'you should have a grid with 2 rows');
  });

  it('should update user rights when checking a right on an user row', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, UsersModule, RouterTestingModule],
      providers: [
        { provide: UsersListResolve, useClass: FakeUsersListResolve },
        { provide: PreferencesService, useClass: FakePreferencesService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: UsersService, useValue: fakeUsersService }
      ]
    });

    fixture = TestBed.createComponent(UsersListComponent);
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

    comp.usersData.subscribe(r => {
      expect(r.users[0].usr_rights.length).toBe(1, 'you should have 1 right linked to user1');
      expect(r.users[0].usr_rights).toBe(routeData.list.users[0].usr_rights, 'user1 should have the right 1 available');
    });
  });

  it('should update user rights when unchecking a right on an user row', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, UsersModule, RouterTestingModule],
      providers: [
        { provide: UsersListResolve, useClass: FakeUsersListResolve },
        { provide: PreferencesService, useClass: FakePreferencesService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: UsersService, useValue: fakeUsersService }
      ]
    });

    fixture = TestBed.createComponent(UsersListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    comp.setTabular(true);
    fixture.detectChanges();

    const checkbox = fixture.nativeElement.querySelectorAll('.ag-body-viewport .ag-row ng-component input')[3];
    expect(checkbox.checked).toBe(true, 'checkbox should be checked');
    checkbox.checked = false;
    checkbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(checkbox.checked).toBe(false, 'checkbox should be unchecked now');

    comp.usersData.subscribe(r => {
      expect(r.users[1].usr_rights.length).toBe(0, 'length should be 0');
      expect(r.users[1].usr_rights).toBe(routeData.list.users[1].usr_rights, 'user1 should have no rights');
    });
  });

  /*it('should update user usergroup when editing the cell value', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, UsersModule, RouterTestingModule],
      providers: [
        { provide: UsersListResolve, useClass: FakeUsersListResolve },
        { provide: PreferencesService, useClass: FakePreferencesService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: UsersService, useValue: fakeUsersService }
      ]
    });

    fixture = TestBed.createComponent(UsersListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    comp.setTabular(true);
    fixture.detectChanges();

    let cells = fixture.nativeElement.querySelectorAll('.ag-body-viewport .ag-row .ag-cell');
    let cell = cells[cells.length / 2 -1];
    expect(cell.innerHTML).toContain('usergroup 1', 'user1 usergroup should be "usergroup 1"');
    cell.innerHTML = 'usergroup 2';
    cell.dispatchEvent(new Event('cellValueChanged'));
    fixture.detectChanges();

    comp.usersData.subscribe(r => {
      expect(r.users[0].ugr_id).toBe(2, 'user1 usergroup should be "usergroup 2"');
    });
  });*/
});
