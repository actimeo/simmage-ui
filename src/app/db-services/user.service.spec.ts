/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { DbUserLogin } from '../db-models/login';
import { DbPortal } from '../db-models/portal';
import { DbGroup } from '../db-models/organ';
import { UserService } from './user.service';
import { PgService } from '../pg.service';

class FakePgService {
  public badTokenEvents = new Subject<boolean>();
  public pgcall(url: string, args: any): any {
    switch (url) {
      case 'login/user_login':
        return Observable.of({
          usr_token: 123,
          usr_temp_pwd: false,
          usr_rights: ['organization'],
          par_id: 1,
          ugr_id: 1,
          par_firstname: 'Philippe',
          par_lastname: 'MARTIN'
        } as DbUserLogin);
      case 'login/usergroup_portal_list':
        return Observable.of({
          por_id: 1,
          por_name: 'a portal'
        } as DbPortal);
      case 'login/usergroup_group_list':
        return Observable.of({
          grp_id: 1,
          org_id: 1,
          grp_name: 'a group',
          grp_description: 'a desc',
          grp_mandatory: true,
          grp_orientation: 'organization'
        } as DbGroup);
    }
  }
  constructor() {
  }
};

describe('Service: User', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: PgService, useClass: FakePgService }
      ]
    });
  });

  it('should instanciate', inject([UserService], (userService: UserService) => {
    expect(userService).toBeTruthy();
  }));

  it('should listen for badTokenEvents and logout', inject([UserService], (userService: UserService) => {
    spyOn(userService, 'logout');
    userService.pg.badTokenEvents.next(true);
    expect(userService.logout).toHaveBeenCalled();
  }));

  it('should login', inject([UserService], (userService: UserService) => {
    userService.login('toto', 'otot').subscribe(res => {
      expect(userService.userData.login).toEqual('toto');
      expect(userService.isAdmin()).toEqual(true);
      expect(userService.hasRight('organization')).toEqual(true);
      userService.logout();
    });
  }));

});
