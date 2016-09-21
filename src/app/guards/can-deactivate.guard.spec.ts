/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CanComponentDeactivate, CanDeactivateGuard } from './can-deactivate.guard';
import { UserService } from '../shared/user.service';
import { PgService } from '../pg.service';

class ComponentWithoutCanDeactivate {}

class ComponentDoCanDeactivate implements CanComponentDeactivate {
  canDeactivate() { return true; }
}

class ComponentDontCanDeactivate implements CanComponentDeactivate {
  canDeactivate() { return false; }
}

describe('CanDeactivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [CanDeactivateGuard]
    });
  });

  it('should activate when user is logged', inject([CanDeactivateGuard], (service: CanDeactivateGuard) => {
    expect(service).toBeTruthy();
    expect(service.canDeactivate(new ComponentWithoutCanDeactivate() as any)).toEqual(true);

    expect(service.canDeactivate(new ComponentDoCanDeactivate())).toEqual(true);

    expect(service.canDeactivate(new ComponentDontCanDeactivate() as any)).toEqual(false);
  }));
});

