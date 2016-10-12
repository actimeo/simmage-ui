/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EventsTypesResolve } from './events-types-resolve.guard';
import { AppModule } from '../../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import { EventsTypesService } from './events-types.service';
import { Observable } from 'rxjs/Observable';

const element = {
  eventType: {
    ety_id: 1,
    ety_name: 'a name'
  }, topics: [], organizations: []
};

class FakeEventsTypesService {
  loadEventsTypesDetails(id: number): any {
    if (id === 1) {
      return Observable.of(element);
    } else {
      return Observable.throw('error');
    }
  }
};

const fakeEventsTypesService = new FakeEventsTypesService();

const fakeRouter = jasmine.createSpyObj('Router', ['navigate']);

describe('Service: EventsTypesResolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
        EventsTypesResolve,
        { provide: EventsTypesService, useValue: fakeEventsTypesService },
        { provide: Router, useValue: fakeRouter }
      ]
    });
  });

  it('should return an observable with events-types', inject([EventsTypesResolve], (service: EventsTypesResolve) => {

    const fakeActivatedRoute = new ActivatedRouteSnapshot();
    fakeActivatedRoute.params = { id: 1 };
    const res = service.resolve(fakeActivatedRoute, null);
    expect(res).toEqual(jasmine.any(Observable), 'resolve should return an observable');
    res.subscribe(s => expect(s).toEqual(element, 'resolve should return events-types object'));
  }));

  it('should navigate back to /admin/events-types if an error occurs when trying to load the events-types',
    inject([EventsTypesResolve], (service: EventsTypesResolve) => {
      const fakeActivatedRoute = new ActivatedRouteSnapshot();
      fakeActivatedRoute.params = { id: 3 };

      const res = service.resolve(fakeActivatedRoute, null);
      expect(res).toEqual(jasmine.any(Observable), 'resolve should return an observable');
      res.subscribe(s => expect(s).toEqual(false, 'resolve should return an observable with false as value'));

      expect(fakeRouter.navigate).toHaveBeenCalledWith(['/admin/events-types']);
    }));
});
