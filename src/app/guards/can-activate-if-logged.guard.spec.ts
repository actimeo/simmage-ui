/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CanActivateIfLogged } from './can-activate-if-logged.guard';
import { UserService } from '../shared/user.service';
import { PgService } from '../pg.service';

class FakeUserLogged {
  isLoggedIn() { return true; }
  logout() {}
}

class FakeUserNotLogged {
  isLoggedIn() { return false; }
  logout() {}
}

describe('CanActivateIfLogged', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [CanActivateIfLogged,
        { provide: UserService, useClass: FakeUserLogged },
      ]
    });
  });

  it('should activate when user is logged', inject([CanActivateIfLogged], (service: CanActivateIfLogged) => {
    expect(service).toBeTruthy();
    expect(service.canActivate()).toEqual(true);
  }));
});

describe('CanActivateIfAdmin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [CanActivateIfLogged,
        { provide: UserService, useClass: FakeUserNotLogged },
      ]
    });
  });

  it('should not activate when user is not logged', inject([CanActivateIfLogged], (service: CanActivateIfLogged) => {
    expect(service).toBeTruthy();
    spyOn(service.user, 'logout');
    expect(service.canActivate()).toEqual(false);
    expect(service.user.logout).toHaveBeenCalled();
  }));

});
