/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { <%= classifiedModuleName %>Resolve } from './<%= dasherizedModuleName %>-resolve.guard';
import { AppModule } from '../../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import { <%= classifiedModuleName %>Service } from './<%= dasherizedModuleName %>.service';
import { Observable } from 'rxjs/Observable';

class Fake<%= classifiedModuleName %>Service {
  get<%= classifiedModuleName %>(id: number): any {
    if (id === 1) {
      return Observable.of({
        // TODO : create an object of type <%= classifiedModuleName %>
      });
    } else {
      return Observable.throw('error');
    }
  }
};

const fake<%= classifiedModuleName %>Service = new Fake<%= classifiedModuleName %>Service();

const fakeRouter = jasmine.createSpyObj('Router', ['navigate']);

describe('Service: <%= classifiedModuleName %>Resolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
        <%= classifiedModuleName %>Resolve,
        { provide: <%= classifiedModuleName %>Service, useValue: fake<%= classifiedModuleName %>Service },
        { provide: Router, useValue: fakeRouter }
      ]
    });
  });

  it('should return an observable with <%= dasherizedModuleName %>', inject([<%= classifiedModuleName %>Resolve], (service: <%= classifiedModuleName %>Resolve) => {

    const fakeActivatedRoute = new ActivatedRouteSnapshot();
    fakeActivatedRoute.params = { id: 1 };
    const res = service.resolve(fakeActivatedRoute, null);
    expect(res).toEqual(jasmine.any(Observable), 'resolve should return an observable');
    res.subscribe(s => expect(s).toEqual({
      // TODO : this object should match the one defined in the Fake<%= classifiedModuleName %>Service above
    }, 'resolve should return <%= dasherizedModuleName %> object'));
  }));

  it('should navigate back to /admin/<%= dasherizedModuleName %> if an error occurs when trying to load the <%= dasherizedModuleName %>',
    inject([<%= classifiedModuleName %>Resolve], (service: <%= classifiedModuleName %>Resolve) => {
    const fakeActivatedRoute = new ActivatedRouteSnapshot();
    fakeActivatedRoute.params = { id: 3 };

    const res = service.resolve(fakeActivatedRoute, null);
    expect(res).toEqual(jasmine.any(Observable), 'resolve should return an observable');
    res.subscribe(s => expect(s).toEqual(false, 'resolve should return an observable with false as value'));

    expect(fakeRouter.navigate).toHaveBeenCalledWith(['/admin/<%= dasherizedModuleName %>']);
  }));
});
