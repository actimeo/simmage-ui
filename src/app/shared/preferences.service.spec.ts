/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PreferencesService } from './preferences.service';

describe('Service: Preferences', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreferencesService]
    });
  });

  it('should ...', inject([PreferencesService], (service: PreferencesService) => {
    expect(service).toBeTruthy();
  }));
});
