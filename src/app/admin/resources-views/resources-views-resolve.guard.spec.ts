/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ResourcesViewsResolve } from './resources-views-resolve.guard';
import { AppModule } from '../../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import { ResourcesViewsService } from './resources-views.service';
import { Observable } from 'rxjs/Observable';

class FakeResourcesViewsService {
  getResourcesViews(id: number): any {
    if (id === 1) {
      return Observable.of({
        // TODO : create an object of type ResourcesViews
      });
    } else {
      return Observable.throw('error');
    }
  }
};

const fakeResourcesViewsService = new FakeResourcesViewsService();

const fakeRouter = jasmine.createSpyObj('Router', ['navigate']);

describe('Service: ResourcesViewsResolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
        ResourcesViewsResolve,
        { provide: ResourcesViewsService, useValue: fakeResourcesViewsService },
        { provide: Router, useValue: fakeRouter }
      ]
    });
  });

  it('should return an observable with resources-views', inject([ResourcesViewsResolve], (service: ResourcesViewsResolve) => {

    const fakeActivatedRoute = new ActivatedRouteSnapshot();
    fakeActivatedRoute.params = { id: 1 };
    const res = service.resolve(fakeActivatedRoute, null);
    expect(res).toEqual(jasmine.any(Observable), 'resolve should return an observable');
    res.subscribe(s => expect(s).toEqual({
      // TODO : this object should match the one defined in the FakeResourcesViewsService above
    }, 'resolve should return resources-views object'));
  }));

  it('should navigate back to /admin/resources-views if an error occurs when trying to load the resources-views',
    inject([ResourcesViewsResolve], (service: ResourcesViewsResolve) => {
    const fakeActivatedRoute = new ActivatedRouteSnapshot();
    fakeActivatedRoute.params = { id: 3 };

    const res = service.resolve(fakeActivatedRoute, null);
    expect(res).toEqual(jasmine.any(Observable), 'resolve should return an observable');
    res.subscribe(s => expect(s).toEqual(false, 'resolve should return an observable with false as value'));

    expect(fakeRouter.navigate).toHaveBeenCalledWith(['/admin/resources-views']);
  }));
});
