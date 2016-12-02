/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EventResolveService } from './event-resolve.guard';

describe('EventResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventResolveService]
    });
  });

  it('should ...', inject([EventResolveService], (service: EventResolveService) => {
    expect(service).toBeTruthy();
  }));
});
