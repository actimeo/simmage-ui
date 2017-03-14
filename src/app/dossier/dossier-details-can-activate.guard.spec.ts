import { TestBed, async, inject } from '@angular/core/testing';

import { DossierDetailsCanActivateGuard } from './dossier-details-can-activate.guard';

describe('DossierDetailsCanActivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DossierDetailsCanActivateGuard]
    });
  });

  it('should ...', inject([DossierDetailsCanActivateGuard], (guard: DossierDetailsCanActivateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
