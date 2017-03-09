/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UsergroupResolve } from './usergroup-resolve.guard';
import { AppModule } from '../../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import { UsergroupsService } from './usergroups.service';
import { Observable } from 'rxjs/Observable';

const element = {
  ugr_id: 1,
  ugr_name: 'usergroup',
  ugr_rights: [],
  ugr_statuses: [],
  groups: [],
  portals: [],
  topics: []
};

class FakeUsergroupService {
  loadUsergroups(id: number): any {
    if (id === 1) {
      return Observable.of(element);
    } else {
      return Observable.throw('error');
    }
  }
}

const fakeUsergroupService = new FakeUsergroupService();

const fakeRouter = jasmine.createSpyObj('Router', ['navigate']);

describe('Service: UsergroupResolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
        UsergroupResolve,
        { provide: Router, useValue: fakeRouter },
        { provide: UsergroupsService, useValue: fakeUsergroupService }
      ]
    });
  });

  it('should return an usergroup as observable', inject([UsergroupResolve], (service: UsergroupResolve) => {
    const fakeActivatedRoute = new ActivatedRouteSnapshot();
    fakeActivatedRoute.params = { id: 1 };
    const res = service.resolve(fakeActivatedRoute, null);
    expect(res).toEqual(jasmine.any(Observable), 'resolve should return an observable');
    res.subscribe(s => expect(s).toEqual(element, 'resolve should return an usergroup object'));
  }));

  it('should navigate back to /admin/usergroups if an error occurs when trying to load the usergroup',
    inject([UsergroupResolve], (service: UsergroupResolve) => {
      const fakeActivatedRoute = new ActivatedRouteSnapshot();
      fakeActivatedRoute.params = { id: 3 };
      const res = service.resolve(fakeActivatedRoute, null);
      expect(res).toEqual(jasmine.any(Observable), 'resolve should retunr an observable');
      res.subscribe(s => expect(s).toEqual(false, 'resolve should return an observable with false as value'));

      expect(fakeRouter.navigate).toHaveBeenCalledWith(['/admin/usergroups']);
    }));
});
