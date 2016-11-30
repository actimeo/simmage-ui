/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ObjectivesViewsResolve } from './objectives-views-resolve.guard';
import { AppModule } from '../../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import { ObjectivesViewsService } from './objectives-views.service';
import { Observable } from 'rxjs/Observable';

class FakeObjectivesViewsService {
  getObjectivesViews(id: number): any {
    if (id === 1) {
      return Observable.of({
        // TODO : create an object of type ObjectivesViews
      });
    } else {
      return Observable.throw('error');
    }
  }
};

const fakeObjectivesViewsService = new FakeObjectivesViewsService();

const fakeRouter = jasmine.createSpyObj('Router', ['navigate']);

describe('Service: ObjectivesViewsResolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
        ObjectivesViewsResolve,
        { provide: ObjectivesViewsService, useValue: fakeObjectivesViewsService },
        { provide: Router, useValue: fakeRouter }
      ]
    });
  });

  it('should return an observable with objectives-views', inject([ObjectivesViewsResolve], (service: ObjectivesViewsResolve) => {

    const fakeActivatedRoute = new ActivatedRouteSnapshot();
    fakeActivatedRoute.params = { id: 1 };
    const res = service.resolve(fakeActivatedRoute, null);
    expect(res).toEqual(jasmine.any(Observable), 'resolve should return an observable');
    res.subscribe(s => expect(s).toEqual({
      // TODO : this object should match the one defined in the FakeObjectivesViewsService above
    }, 'resolve should return objectives-views object'));
  }));

  it('should navigate back to /admin/objectives-views if an error occurs when trying to load the objectives-views',
    inject([ObjectivesViewsResolve], (service: ObjectivesViewsResolve) => {
    const fakeActivatedRoute = new ActivatedRouteSnapshot();
    fakeActivatedRoute.params = { id: 3 };

    const res = service.resolve(fakeActivatedRoute, null);
    expect(res).toEqual(jasmine.any(Observable), 'resolve should return an observable');
    res.subscribe(s => expect(s).toEqual(false, 'resolve should return an observable with false as value'));

    expect(fakeRouter.navigate).toHaveBeenCalledWith(['/admin/objectives-views']);
  }));
});
