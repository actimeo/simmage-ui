import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import '../rxjs_operators';

import { UserService } from '../shared/user.service';
import { PgService } from '../pg.service';

import { DbPortal } from '../db-models/portal';
import { DbGroupList } from '../db-models/organ';

@Injectable()
export class UsergroupService {

  constructor(private user: UserService, private pg: PgService) { }

  public loadPortals(): Observable<DbPortal[]> {
    return this.pg.pgcall('portal/portal_list', {
      prm_token: this.user.userData.token
    });
  }

  public loadGroups(): Observable<DbGroupList[]> {
    return this.pg.pgcall('organ/group_list', {
      prm_token: this.user.userData.token,
      prm_org_id: null,
      prm_internal: true
    });
  }

  public addUsergroup(name: string, groups: number[], portals: number[]): Observable<number> {
    let id = this.pg.pgcall('login/usergroup_add', {
      prm_token: this.user.userData.token,
      prm_name: name
    });

    // todo : call _set_portals/groups with token + id + arrays

    return id;
  }

}
