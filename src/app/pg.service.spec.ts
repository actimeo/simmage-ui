/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { PgService } from './pg.service';

describe('Service: Pg', () => {
  beforeEach(() => {
    addProviders([PgService]);
  });

  it('should ...',
    inject([PgService],
      (service: PgService) => {
        expect(service).toBeTruthy();
      }));
});
