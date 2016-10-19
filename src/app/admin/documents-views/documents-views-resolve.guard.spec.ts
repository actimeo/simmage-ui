/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DocumentsViewsResolve } from './documents-views-resolve.guard';
import { AppModule } from '../../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import { DocumentsViewsService } from './documents-views.service';
import { Observable } from 'rxjs/Observable';

class FakeDocumentsViewsService {
  getDocumentsViews(id: number): any {
    if (id === 1) {
      return Observable.of({
        // TODO : create an object of type DocumentsViews
      });
    } else {
      return Observable.throw('error');
    }
  }
};

const fakeDocumentsViewsService = new FakeDocumentsViewsService();

const fakeRouter = jasmine.createSpyObj('Router', ['navigate']);

describe('Service: DocumentsViewsResolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
        DocumentsViewsResolve,
        { provide: DocumentsViewsService, useValue: fakeDocumentsViewsService },
        { provide: Router, useValue: fakeRouter }
      ]
    });
  });

  it('should return an observable with documents-views', inject([DocumentsViewsResolve], (service: DocumentsViewsResolve) => {

    const fakeActivatedRoute = new ActivatedRouteSnapshot();
    fakeActivatedRoute.params = { id: 1 };
    const res = service.resolve(fakeActivatedRoute, null);
    expect(res).toEqual(jasmine.any(Observable), 'resolve should return an observable');
    res.subscribe(s => expect(s).toEqual({
      // TODO : this object should match the one defined in the FakeDocumentsViewsService above
    }, 'resolve should return documents-views object'));
  }));

  it('should navigate back to /admin/documents-views if an error occurs when trying to load the documents-views',
    inject([DocumentsViewsResolve], (service: DocumentsViewsResolve) => {
    const fakeActivatedRoute = new ActivatedRouteSnapshot();
    fakeActivatedRoute.params = { id: 3 };

    const res = service.resolve(fakeActivatedRoute, null);
    expect(res).toEqual(jasmine.any(Observable), 'resolve should return an observable');
    res.subscribe(s => expect(s).toEqual(false, 'resolve should return an observable with false as value'));

    expect(fakeRouter.navigate).toHaveBeenCalledWith(['/admin/documents-views']);
  }));
});
