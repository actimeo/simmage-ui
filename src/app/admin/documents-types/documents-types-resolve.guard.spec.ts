/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DocumentsTypesResolve } from './documents-types-resolve.guard';
import { AppModule } from '../../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import { DocumentsTypesService } from './documents-types.service';
import { Observable } from 'rxjs/Observable';

const element = {
  documentType: {
    dty_id: 1,
    dty_name: 'a name'
  }, topics: [], organizations: []
};

class FakeDocumentsTypesService {
  loadDocumentsTypesDetails(id: number): any {
    if (id === 1) {
      return Observable.of(element);
    } else {
      return Observable.throw('error');
    }
  }
};

const fakeDocumentsTypesService = new FakeDocumentsTypesService();

const fakeRouter = jasmine.createSpyObj('Router', ['navigate']);

describe('Service: DocumentsTypesResolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
        DocumentsTypesResolve,
        { provide: DocumentsTypesService, useValue: fakeDocumentsTypesService },
        { provide: Router, useValue: fakeRouter }
      ]
    });
  });

  it('should return an observable with documents-types', inject([DocumentsTypesResolve], (service: DocumentsTypesResolve) => {

    const fakeActivatedRoute = new ActivatedRouteSnapshot();
    fakeActivatedRoute.params = { id: 1 };
    const res = service.resolve(fakeActivatedRoute, null);
    expect(res).toEqual(jasmine.any(Observable), 'resolve should return an observable');
    res.subscribe(s => expect(s).toEqual(element, 'resolve should return documents-types object'));
  }));

  it('should navigate back to /admin/documents-types if an error occurs when trying to load the documents-types',
    inject([DocumentsTypesResolve], (service: DocumentsTypesResolve) => {
      const fakeActivatedRoute = new ActivatedRouteSnapshot();
      fakeActivatedRoute.params = { id: 3 };

      const res = service.resolve(fakeActivatedRoute, null);
      expect(res).toEqual(jasmine.any(Observable), 'resolve should return an observable');
      res.subscribe(s => expect(s).toEqual(false, 'resolve should return an observable with false as value'));

      expect(fakeRouter.navigate).toHaveBeenCalledWith(['/admin/documents-types']);
    }));
});
