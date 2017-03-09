import { ParticipantsService } from './../../../services/backend/participants.service';
/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Response, ResponseOptions } from '@angular/http';

import { UserComponent } from './user.component';
import { AppModule } from '../../../app.module';
import { UsersModule } from '../users.module';
import { UsersService } from '../users.service';

let comp: UserComponent;
let fixture: ComponentFixture<UserComponent>;

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
          ugr_name: 'group 1'
        },
        {
          usr_login: 'user2',
          usr_rights: [],
          par_id: 2,
          par_firstname: 'firstname2',
          par_lastname: 'lastname2',
          ugr_id: 2,
          ugr_name: 'group 2'
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
          ugr_id: null,
          ugr_name: 'admin'
        },
        {
          usr_login: 'user4',
          usr_rights: [],
          par_id: 4,
          par_firstname: 'firstname4',
          par_lastname: 'lastname4',
          ugr_id: null,
          ugr_name: 'admin'
        }
      ]);
    }
  }

  addUser() { }
  deleteUser() { }
  updateUser() { }

  loadUser() { }
  loadUsergroups() {
    return Observable.of([{}]);
  }
  loadParticipants() {
    return Observable.of([{}]);
  }
}

const fakeUsersService = new FakeUsersService();

const fakeActivatedRoute = {
  data: Observable.of({
    'user': {
      usr_login: 'user2',
      usr_rights: [],
      par_id: 2,
      par_firstname: 'firstname2',
      par_lastname: 'lastname2',
      ugr_id: 2,
      ugr_name: 'group 2'
    },
    'list': {
      usergroups: [],
      participants: []
    }
  }),
  params: Observable.of({})
};

const fakeActivatedRouteNew = {
  data: Observable.of({
    'list': {
      usergroups: [],
      participants: []
    }
  }),
  params: Observable.of({})
};

class FakeParticipantsService {
  list() {
    return Observable.of([

    ]);
  }
}

describe('Component: User', () => {
  it('should display an user', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, UsersModule, RouterTestingModule],
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: ParticipantsService, useClass: FakeParticipantsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(UserComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    expect(comp.loginCtrl.value).toEqual('user2');
    expect(comp.participantCtrl.value).toEqual(2);
  });

  it('should call doCancel when click on cancel button', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, UsersModule, RouterTestingModule],
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: ParticipantsService, useClass: FakeParticipantsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew }
      ]
    });

    fixture = TestBed.createComponent(UserComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    const element = fixture.nativeElement;
    const cancelButton = element.querySelectorAll('md-card-actions button')[0];
    expect(cancelButton).not.toBeNull('You should have a button element');
    expect(cancelButton.textContent).toContain('Cancel');

    spyOn(comp, 'doCancel');
    cancelButton.dispatchEvent(new Event('click'));
    expect(comp.doCancel).toHaveBeenCalled();
  });

  it('should call doCancel then goBacktolist when clicking on cancel button', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, UsersModule, RouterTestingModule],
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: ParticipantsService, useClass: FakeParticipantsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew }
      ]
    });

    fixture = TestBed.createComponent(UserComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    const element = fixture.nativeElement;
    const cancelButton = element.querySelectorAll('md-card-actions button')[0];
    expect(cancelButton).not.toBeNull('You should have a button element');
    expect(cancelButton.textContent).toContain('Cancel');

    spyOn(comp, 'goBackToList');
    cancelButton.dispatchEvent(new Event('click'));
    expect(comp.goBackToList).toHaveBeenCalled();
  });

  it('should call doDelete when clicking on delete button', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, UsersModule, RouterTestingModule],
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: ParticipantsService, useClass: FakeParticipantsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(UserComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    const element = fixture.nativeElement;
    const deleteButton = element.querySelectorAll('md-card-actions button')[0];
    expect(deleteButton).not.toBeNull('You should have a button element');
    expect(deleteButton.textContent).toContain('Delete');

    spyOn(comp, 'doDelete');
    deleteButton.dispatchEvent(new Event('click'));
    expect(comp.doDelete).toHaveBeenCalled();
  });

  it('should display error message on delete error', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, UsersModule, RouterTestingModule],
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: ParticipantsService, useClass: FakeParticipantsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(UserComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    const element = fixture.nativeElement;
    const deleteButton = element.querySelectorAll('md-card-actions button')[0];
    expect(deleteButton).not.toBeNull('You should have a button element');
    expect(deleteButton.textContent).toContain('Delete');

    const resp = new Response(new ResponseOptions());
    const subj = new Subject();
    spyOn(comp.usersService, 'deleteUser').and.returnValue(subj);
    subj.error(resp);

    deleteButton.dispatchEvent(new Event('click'));
    expect(comp.errorMsg).toEqual('Error deleting user');
  });

  it('canDeactivate should return true if no changes where done', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, UsersModule, RouterTestingModule],
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: ParticipantsService, useClass: FakeParticipantsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew }
      ]
    });
    fixture = TestBed.createComponent(UserComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    let ret = comp.canDeactivate();
    fixture.detectChanges();

    expect(ret).toEqual(true);
    expect(comp.pleaseSave).toEqual(false);
  });

  it('canDeactivate should return false if changes where done', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, UsersModule, RouterTestingModule],
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: ParticipantsService, useClass: FakeParticipantsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew }
      ]
    });
    fixture = TestBed.createComponent(UserComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    const element = fixture.nativeElement;
    const loginInput = element.querySelectorAll('input')[0];
    loginInput.value = 'newlogin';
    loginInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    let ret = comp.canDeactivate();

    expect(ret).toEqual(false);
    expect(comp.pleaseSave).toEqual(true);
  });

  it('should add a new user and return its new id on submit', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, UsersModule, RouterTestingModule],
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: ParticipantsService, useClass: FakeParticipantsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew }
      ]
    });
    fixture = TestBed.createComponent(UserComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    spyOn(comp.usersService, 'addUser').and.returnValue(Observable.of('user1'));

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));

    fixture.detectChanges();
// TODO     expect(comp.login).toEqual('user1');
  });

  it('should update a group and its topics on submit', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, UsersModule, RouterTestingModule],
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: ParticipantsService, useClass: FakeParticipantsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(UserComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    spyOn(comp.usersService, 'updateUser').and.returnValue(Observable.of(true));

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));

    fixture.detectChanges();
    expect(comp.login).toEqual('user2');
  });

  it('should display an error message when error occurs on add submit', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, UsersModule, RouterTestingModule],
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: ParticipantsService, useClass: FakeParticipantsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew }
      ]
    });
    fixture = TestBed.createComponent(UserComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    const resp = new Response(new ResponseOptions({ body: 'error !' }));
    const subj = new Subject();
    spyOn(comp.usersService, 'addUser').and.returnValue(subj);
    subj.error(resp);

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(comp.errorDetails).toEqual('error !');
    expect(comp.errorMsg).toEqual('Error adding user');
  });

  it('should display an error message when error occurs on update submit', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, UsersModule, RouterTestingModule],
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: ParticipantsService, useClass: FakeParticipantsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(UserComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    const resp = new Response(new ResponseOptions({ body: 'error !' }));
    const subj = new Subject();
    spyOn(comp.usersService, 'updateUser').and.returnValue(subj);
    subj.error(resp);

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(comp.errorDetails).toEqual('error !');
    expect(comp.errorMsg).toEqual('Error update user');
  });

  it('should navigate back to user list when gobacktolist is called', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, UsersModule, RouterTestingModule],
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: ParticipantsService, useClass: FakeParticipantsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(UserComponent);
    comp = fixture.componentInstance;

    spyOn(comp.router, 'navigate');
    comp.goBackToList();
    expect(comp.router.navigate).toHaveBeenCalledWith(['/admin/users']);
  });
});
