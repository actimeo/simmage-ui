/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SwitchthemeService } from './switchtheme.service';

describe('SwitchthemeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwitchthemeService]
    });
  });

  it('should ...', inject([SwitchthemeService], (service: SwitchthemeService) => {
    expect(service).toBeTruthy();
  }));
});
