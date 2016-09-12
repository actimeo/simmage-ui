/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TopicResolve } from './topic-resolve.guard';

describe('Service: TopicResolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopicResolveService]
    });
  });

  it('should ...', inject([TopicResolveService], (service: TopicResolveService) => {
    expect(service).toBeTruthy();
  }));
});
