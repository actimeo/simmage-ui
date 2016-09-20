/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminCenterComponent } from './admin-center.component';
import { UserService } from '../../db-services/user.service';
import { Router } from '@angular/router';
import { AppModule } from '../../app.module';
import { PgService } from '../../pg.service';
import { Observable } from 'rxjs/Observable';
import { SidenavComponent } from '../sidenav/sidenav.component';

class FakeUserData {
  hasRight(r) {
    return true;
  }
}

class FakeUserService {
  userData: FakeUserData;

  userDataState: any = Observable.of({

  });

  logout() { }
}

class FakeSidenav {
  userData: FakeUserData;
}

describe('Component: AdminCenter', () => {

  let comp: AdminCenterComponent;
  let fixture: ComponentFixture<AdminCenterComponent>;

  const fakeRouter = jasmine.createSpyObj('Router', ['navigate']);
  const fakeUserService = new FakeUserService();
  const fakeSidenav = new FakeSidenav();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        { provide: UserService, useValue: fakeUserService },
        { provide: Router, useValue: fakeRouter },
        PgService
      ]
    });
  });

  /*it('should successfully call the logout function from userSerivce', () => {
    fixture = TestBed.createComponent(AdminCenterComponent);
    comp = fixture.componentInstance;
    fakeUserService.userData = new FakeUserData();

    fixture.detectChanges();
    spyOn(fakeUserService, 'logout');

    comp.onLogout();

    expect(fakeUserService.logout).toHaveBeenCalled();
  });*/


});
