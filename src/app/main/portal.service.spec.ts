/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { PortalService } from './portal.service';

describe('Service: Portal', () => {
  beforeEach(() => {
    addProviders([PortalService]);
  });

  it('should ...',
    inject([PortalService],
      (service: PortalService) => {
        expect(service).toBeTruthy();
      }));
});
