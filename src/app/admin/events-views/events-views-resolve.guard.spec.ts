/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EventsViewsResolve } from './events-views-resolve.guard';
import { AppModule } from '../../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import { EventsViewsService } from './events-views.service';
import { Observable } from 'rxjs/Observable';

class FakeEventsViewsService {
  getEventsViews(id: number): any {
    if (id === 1) {
      return Observable.of({
        // TODO : create an object of type EventsViews
      });
    } else {
      return Observable.throw('error');
    }
  }
};

const fakeEventsViewsService = new FakeEventsViewsService();

const fakeRouter = jasmine.createSpyObj('Router', ['navigate']);

describe('Service: EventsViewsResolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
        EventsViewsResolve,
        { provide: EventsViewsService, useValue: fakeEventsViewsService },
        { provide: Router, useValue: fakeRouter }
      ]
    });
  });

  it('should return an observable with events-views', inject([EventsViewsResolve], (service: EventsViewsResolve) => {

    const fakeActivatedRoute = new ActivatedRouteSnapshot();
    fakeActivatedRoute.params = { id: 1 };
    const res = service.resolve(fakeActivatedRoute, null);
    expect(res).toEqual(jasmine.any(Observable), 'resolve should return an observable');
    res.subscribe(s => expect(s).toEqual({
      // TODO : this object should match the one defined in the FakeEventsViewsService above
    }, 'resolve should return events-views object'));
  }));

  it('should navigate back to /admin/events-views if an error occurs when trying to load the events-views',
    inject([EventsViewsResolve], (service: EventsViewsResolve) => {
    const fakeActivatedRoute = new ActivatedRouteSnapshot();
    fakeActivatedRoute.params = { id: 3 };

    const res = service.resolve(fakeActivatedRoute, null);
    expect(res).toEqual(jasmine.any(Observable), 'resolve should return an observable');
    res.subscribe(s => expect(s).toEqual(false, 'resolve should return an observable with false as value'));

    expect(fakeRouter.navigate).toHaveBeenCalledWith(['/admin/events-views']);
  }));
});
