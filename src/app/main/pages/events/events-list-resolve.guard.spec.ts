/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EventsListResolveService } from './events-list-resolve.guard';

describe('EventsListResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventsListResolveService]
    });
  });

  it('should ...', inject([EventsListResolveService], (service: EventsListResolveService) => {
    expect(service).toBeTruthy();
  }));
});
