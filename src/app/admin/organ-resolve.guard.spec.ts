/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrganResolve } from './organ-resolve.guard';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import { OrganService } from '../db-services/organ.service';
import { DbOrganization } from '../db-models/organ';
import { Observable } from 'rxjs/Observable';

describe('Service: OrganResolve', () => {

  const fakeActivatedRoute = new ActivatedRouteSnapshot();

  const fakeRouter = jasmine.createSpyObj('Router', ['navigate']);
  const fakeOrganService = jasmine.createSpyObj('OrganService', ['loadOrgan']);

  const organ = Observable.of({
    org_id: 1,
    org_name: 'Organization 1',
    org_description: 'Organization description 1',
    org_internal: true
  });

  it('should return an instance of DbOrganization', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
        { provide: OrganService, uneValue: fakeOrganService },
        { provide: Router, useValue: fakeRouter },
        { provide: ActivatedRouteSnapshot, useValue: fakeActivatedRoute }
      ]
    });

    fakeActivatedRoute.url = [new UrlSegment('', {})];
    fakeActivatedRoute.params = { id: 1 };

    const resolve = new OrganResolve(fakeOrganService, fakeRouter);

    fakeOrganService.loadOrgan.and.returnValue(organ);

    expect(resolve.resolve(fakeActivatedRoute).source).toEqual(organ, 'Resolve function should return something');
  });
});
