 /* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UsersService } from './users.service';
import { Observable } from 'rxjs/Observable';
import { PgService } from '../../services/backend/pg.service';
import { UserService } from '../../services/utils/user.service';

class FakeUserService {
  public userData: any = { token: 123456789 };
}

describe('Service: Users', () => {

  const fakePgService = jasmine.createSpyObj('PgService', ['pgcall']);
  const fakeUserService = new FakeUserService();
  const userToken = 123456789;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersService,
        { provide: UserService, useValue: fakeUserService },
        { provide: PgService, useValue: fakePgService }
        ]
    });
  });

  it('should ...', inject([UsersService], (service: UsersService) => {
    expect(service).toBeTruthy();
  }));

  it('should return an observable of an user', inject([UsersService], (service: UsersService) => {
    const user = {
      usr_login: 'user',
      usr_rights: [],
      par_id: 1,
      par_firstname: 'firstname',
      par_lastname: 'lastname',
      ugr_id: 1,
      ugr_name: 'usergroup 1'
    };

    const userLogin = 'user';

    fakePgService.pgcall.and.returnValue(Observable.of(user));

    service.getUser(userLogin).subscribe(() => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('login/user_info', { prm_login: userLogin });
    });
  }));

  it('should return a list of users', inject([UsersService], (service: UsersService) => {
    const usersData = [
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
    ];

    fakePgService.pgcall.and.returnValue(Observable.of(usersData));

    service.loadUsers(null).subscribe(() => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('login/user_list', { prm_ugr_id: null });
    });
  }));

  it('should return a boolean when we update an user', inject([UsersService], (service: UsersService) => {
    fakePgService.pgcall.and.returnValue(Observable.of(true));

    const userLogin = 'user';
    const parId = 1;
    const ugrId = 1;

    service.updateUser(userLogin, [], parId, ugrId).subscribe(() => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('login/user_update', {
        prm_login: userLogin,
        prm_rights: [],
        prm_par_id: parId,
        prm_ugr_id: ugrId
      });
    });
  }));

  it('should return a boolean when creating an user', inject([UsersService], (service: UsersService) => {
    fakePgService.pgcall.and.returnValue(Observable.of(true));

    const userLogin = 'user';
    const parId = 1;
    const ugrId = 1;

    service.addUser(userLogin, [], parId, ugrId).subscribe(() => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('login/user_add', {
        prm_login: userLogin,
        prm_rights: [],
        prm_par_id: parId,
        prm_ugr_id: ugrId
      });
    });
  }));

  it('should return a boolean when deleting an user', inject([UsersService], (service: UsersService) => {
    fakePgService.pgcall.and.returnValue(Observable.of(true));

    const userLogin = 'user';

    service.deleteUser(userLogin).subscribe(() => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('login/user_delete', { prm_login: userLogin });
    });
  }));

  it('should return user temporary password', inject([UsersService], (service: UsersService) => {
    fakePgService.pgcall.and.returnValue(Observable.of('P@ssw0rd'));

    const userLogin = 'user';

    service.getTemporaryPassword(userLogin).subscribe(() => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('login/user_get_temporary_pwd', { prm_login: userLogin });
    });
  }));

  it('should provide a list of usergroups', inject([UsersService], (service: UsersService) => {
    const usergroups = [
      {
        ugr_id: 1,
        ugr_name: 'usergroup 1'
      },
      {
        ugr_id: 2,
        ugr_name: 'usergroup 2'
      }
    ];

    fakePgService.pgcall.and.returnValue(Observable.of(usergroups));

    service.loadUsergroups().subscribe(() => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('login/usergroup_list', { });
    });
  }));

  it('should ...', inject([UsersService], (service: UsersService) => {
    const participants = [
      {
        par_id: 1,
        par_firstname: 'firstname1',
        par_lastname: 'lastname1'
      },
      {
        par_id: 2,
        par_firstname: 'firstname2',
        par_lastname: 'lastname2'
      }
    ];

    fakePgService.pgcall.and.returnValue(Observable.of(participants));

    service.loadParticipants().subscribe(() => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('organ/participant_list', { });
    });
  }));
});
