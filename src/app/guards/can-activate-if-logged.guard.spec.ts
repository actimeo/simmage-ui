/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CanActivateIfLogged } from './can-activate-if-logged.guard';
import { UserService } from '../services/utils/user.service';
import { PgService } from '../services/backend/pg.service';

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
    expect(service.canActivate(null, null)).toEqual(true);
  }));
});

describe('CanActivateIfLogged', () => {
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
    spyOn(window.localStorage, 'setItem');
    spyOn(service.user, 'logout');
    expect(service.canActivate(null, { url: '/'} as any)).toEqual(false);
    expect(service.user.logout).toHaveBeenCalled();
  }));

});
