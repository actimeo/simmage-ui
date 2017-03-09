/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SnackService } from './snack.service';

describe('Service: Snack', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SnackService]
    });
  });

  it('should ...', inject([SnackService], (service: SnackService) => {
    expect(service).toBeTruthy();
  }));
});
