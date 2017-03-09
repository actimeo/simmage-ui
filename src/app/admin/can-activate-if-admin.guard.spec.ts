/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CanActivateIfAdmin } from './can-activate-if-admin.guard';
import { UserService } from '../services/utils/user.service';
import { PgService } from '../services/backend/pg.service';

class FakeUserAdmin {
  isAdmin() { return true; }
}

class FakeUserNotAdmin {
  isAdmin() { return false; }
  isUser() { return true; }
}

describe('CanActivateIfAdmin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [CanActivateIfAdmin,
        { provide: UserService, useClass: FakeUserAdmin },
      ]
    });
  });

  it('should activate when user is admin', inject([CanActivateIfAdmin], (service: CanActivateIfAdmin) => {
    expect(service).toBeTruthy();
    expect(service.canActivate()).toEqual(true);
  }));
});

describe('CanActivateIfAdmin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [CanActivateIfAdmin,
        { provide: UserService, useClass: FakeUserNotAdmin },
      ]
    });
  });

  it('should not activate when user is not admin', inject([CanActivateIfAdmin], (service: CanActivateIfAdmin) => {
    expect(service).toBeTruthy();
    spyOn(service.router, 'navigate');
    expect(service.canActivate()).toEqual(false);
    expect(service.router.navigate).toHaveBeenCalledWith(['/main']);
  }));

});
