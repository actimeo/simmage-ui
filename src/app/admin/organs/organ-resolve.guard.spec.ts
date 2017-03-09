/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrganResolve } from './organ-resolve.guard';
import { AppModule } from '../../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import { OrganService } from '../../services/backend/organ.service';
import { DbOrganization } from '../../services/backend/db-models/organ';
import { Observable } from 'rxjs/Observable';

class FakeOrganService {
  loadOrgan(id: number): any {
    if (id === 1) {
      return Observable.of({
        org_id: 1,
        org_name: 'Organization 1',
        org_description: 'Organization description 1',
        org_internal: true
      });
    } else {
      return Observable.throw('error');
    }
  }
};

const fakeOrganService = new FakeOrganService();

const fakeRouter = jasmine.createSpyObj('Router', ['navigate']);

describe('Service: OrganResolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
        OrganResolve,
        { provide: OrganService, useValue: fakeOrganService },
        { provide: Router, useValue: fakeRouter }
      ]
    });
  });

  it('should return an observable with an organization', inject([OrganResolve], (service: OrganResolve) => {

    const fakeActivatedRoute = new ActivatedRouteSnapshot();
    fakeActivatedRoute.params = { id: 1 };
    const res = service.resolve(fakeActivatedRoute);
    expect(res).toEqual(jasmine.any(Observable), 'resolve should return an observable');
    res.subscribe(s => expect(s).toEqual({
      org_id: 1,
      org_name: 'Organization 1',
      org_description: 'Organization description 1',
      org_internal: true
    }, 'resolve should return an organization object'));
  }));

  it('should navigate back to /admin/organs if an error occurs when trying to load the organization',
    inject([OrganResolve], (service: OrganResolve) => {
    const fakeActivatedRoute = new ActivatedRouteSnapshot();
    fakeActivatedRoute.params = { id: 3 };

    const res = service.resolve(fakeActivatedRoute);
    expect(res).toEqual(jasmine.any(Observable), 'resolve should return an observable');
    res.subscribe(s => expect(s).toEqual(false, 'resolve should return an observable with false as value'));

    expect(fakeRouter.navigate).toHaveBeenCalledWith(['/admin/organs']);
  }));
});
