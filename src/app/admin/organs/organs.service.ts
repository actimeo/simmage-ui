import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { DbOrganization } from '../../db-models/organ';
import { UserService } from '../../shared/user.service';
import { PgService } from '../../pg.service';

@Injectable()
export class OrgansService {

  public organsInternalState: Observable<DbOrganization[]>;
  public organsExternalState: Observable<DbOrganization[]>;

  constructor(private user: UserService, private pg: PgService) {
        this.organsInternalState = this.loadOrganizations(true);
        this.organsExternalState = this.loadOrganizations(false);
   }

  private loadOrganizations(internal: boolean): Observable<DbOrganization[]> {
    let sourceOrgans = this.pg.pgcall(
      'organ/organization_list', {
        prm_token: this.user.userData.token,
        prm_internal: internal
      });
    return sourceOrgans;
  }
}
