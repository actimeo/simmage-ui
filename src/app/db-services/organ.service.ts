import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../shared/user.service';
import { PgService } from '../pg.service';
import { DbOrganization } from '../db-models/organ';

@Injectable()
export class OrganService {

  organ: Observable<DbOrganization>;

  constructor(private user: UserService, private pg: PgService) { }

  public loadOrgan(id: number): Observable<DbOrganization> {
    return this.pg.pgcall(
      'organ/organization_get', {
        prm_token: this.user.userData.token,
        prm_id: id
      }
    );
  }

  public updateOrgan(id: number, name: string, description: string, internal: boolean): Observable<boolean> {
    return this.pg.pgcall(
      'organ/organization_set', {
        prm_token: this.user.userData.token,
        prm_id: id,
        prm_name: name,
        prm_description: description,
        prm_internal: internal
      }
    );
  }

  public addOrgan(name: string, description: string, internal: boolean): Observable<number> {
    return this.pg.pgcall(
      'organ/organization_add',
      {
        prm_token: this.user.userData.token,
        prm_name: name,
        prm_description: description,
        prm_internal: internal
      }
    );
  }

  public deleteOrgan(id: number) {
    return this.pg.pgcall(
      'organ/organization_delete',
      {
        prm_token: this.user.userData.token,
        prm_id: id
      }
    );
  }
}
