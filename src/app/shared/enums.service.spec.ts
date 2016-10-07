/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EnumsService } from './enums.service';

describe('Service: Enums', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnumsService]
    });
  });

  it('should ...', inject([EnumsService], (service: EnumsService) => {
    expect(service).toBeTruthy();
  }));
});
