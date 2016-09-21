/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import { AppComponent } from './app.component';
import { UserService } from './shared/user.service';
import { UserData } from './data/user-data';

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;

const fakeUserService = {
  userDataState: new Subject<UserData>()
};

class RouterStub {
  navigate(path: Array<string>) { return path; }
}


describe('App: SimmageUi', () => {

  beforeEach(() => {
  });

  it('should subscribe/unsubscribe', () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: UserService, useValue: fakeUserService },
        { provide: Router, useClass: RouterStub }
      ]
    });
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    comp.ngOnInit();
    fixture.detectChanges();
    expect(comp.sub).not.toBeNull('subscription should not be null');
    expect(comp.sub).toEqual(jasmine.any(Subscription), 'should be a subscription');

    spyOn(comp.sub, 'unsubscribe');
    comp.ngOnDestroy();
    expect(comp.sub.unsubscribe).toHaveBeenCalled();
  });

  it('should go to login page when logged out', () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: UserService, useValue: fakeUserService },
        { provide: Router, useClass: RouterStub }
      ]
    });
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    spyOn(comp.router, 'navigate');

    fixture.detectChanges();

    comp.ngOnInit();
    let userData: UserData = new UserData(null);
    userData.loggedIn = false;

    fakeUserService.userDataState.next(userData);
    fixture.detectChanges();
    expect(comp.router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should go nowhere when logged in', () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: UserService, useValue: fakeUserService },
        { provide: Router, useClass: RouterStub }
      ]
    });
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    spyOn(comp.router, 'navigate');

    fixture.detectChanges();

    comp.ngOnInit();
    let userData: UserData = new UserData(null);
    userData.loggedIn = true;

    fakeUserService.userDataState.next(userData);
    fixture.detectChanges();
    expect(comp.router.navigate).not.toHaveBeenCalled();
  });

});
