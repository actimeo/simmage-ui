/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ListsViewsResolve } from './lists-views-resolve.guard';
import { AppModule } from '../../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import { ListsViewsService } from './lists-views.service';
import { Observable } from 'rxjs/Observable';

class FakeListsViewsService {
  getListsViews(id: number): any {
    if (id === 1) {
      return Observable.of({
        // TODO : create an object of type ListsViews
      });
    } else {
      return Observable.throw('error');
    }
  }
};

const fakeListsViewsService = new FakeListsViewsService();

const fakeRouter = jasmine.createSpyObj('Router', ['navigate']);

describe('Service: ListsViewsResolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
        ListsViewsResolve,
        { provide: ListsViewsService, useValue: fakeListsViewsService },
        { provide: Router, useValue: fakeRouter }
      ]
    });
  });

  it('should return an observable with lists-views', inject([ListsViewsResolve], (service: ListsViewsResolve) => {

    const fakeActivatedRoute = new ActivatedRouteSnapshot();
    fakeActivatedRoute.params = { id: 1 };
    const res = service.resolve(fakeActivatedRoute, null);
    expect(res).toEqual(jasmine.any(Observable), 'resolve should return an observable');
    res.subscribe(s => expect(s).toEqual({
      // TODO : this object should match the one defined in the FakeListsViewsService above
    }, 'resolve should return lists-views object'));
  }));

  it('should navigate back to /admin/lists-views if an error occurs when trying to load the lists-views',
    inject([ListsViewsResolve], (service: ListsViewsResolve) => {
    const fakeActivatedRoute = new ActivatedRouteSnapshot();
    fakeActivatedRoute.params = { id: 3 };

    const res = service.resolve(fakeActivatedRoute, null);
    expect(res).toEqual(jasmine.any(Observable), 'resolve should return an observable');
    res.subscribe(s => expect(s).toEqual(false, 'resolve should return an observable with false as value'));

    expect(fakeRouter.navigate).toHaveBeenCalledWith(['/admin/lists-views']);
  }));
});
