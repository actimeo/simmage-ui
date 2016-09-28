/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminCenterComponent } from './admin-center.component';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { PgService } from '../../pg.service';
import { Observable } from 'rxjs/Observable';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { AppModule } from '../../app.module';
import { AdminModule } from '../admin.module';

class FakeUserData {
  hasRight(r) {
    return true;
  }
}

class FakeUserService {
  userData: FakeUserData;

  userDataState: any = Observable.of({

  });
  hasRight(r: string) { return true; }
  logout() { }
  isUser() { return true; }
}

describe('Component: AdminCenter', () => {

  let comp: AdminCenterComponent;
  let fixture: ComponentFixture<AdminCenterComponent>;

  const fakeUserService = new FakeUserService();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AdminModule, RouterTestingModule],
      providers: [
        { provide: UserService, useValue: fakeUserService },
        PgService
      ]
    });
  });

  it('should successfully call the logout function from userSerivce', () => {
    fixture = TestBed.createComponent(AdminCenterComponent);
    comp = fixture.componentInstance;
    fakeUserService.userData = new FakeUserData();

    fixture.detectChanges();
    spyOn(fakeUserService, 'logout');

    comp.onLogout();

    expect(fakeUserService.logout).toHaveBeenCalled();
  });

  it('should navigate to / when click main', () => {
    fixture = TestBed.createComponent(AdminCenterComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(comp.router, 'navigate');

    comp.onMain();

    expect(comp.router.navigate).toHaveBeenCalled();

  });
});
