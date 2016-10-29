import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { UserService } from '../../user.service';
import { PgService } from '../../pg.service';
import { OrganService } from '../../shared/organ.service';

import { DbPortal } from '../../db-models/portal';
import { DbGroupList } from '../../db-models/organ';

export interface GroupJson {
  grp_id: number;
  grp_name: string;
}
export interface PortalJson {
  por_id: number;
  por_name: string;
}
export interface UsergroupJson {
  ugr_id: number;
  ugr_name: string;
  groups: GroupJson[];
  portals: PortalJson[];
}

@Injectable()
export class UsergroupsService {


  constructor(private user: UserService, private pg: PgService, private organ: OrganService) {
  }

  /** 
   * Load the list of usergroups
   * including related portals and groups for each usergroup
   */
  public loadUsergroups(ugr_id: number): Observable<UsergroupJson[]> {
    let req = {
      ugr_id: true,
      ugr_name: true,
      groups: {
        grp_id: true,
        grp_name: true
      },
      portals: {
        por_id: true,
        por_name: true
      }
    };
    return this.pg.pgcall(
      'login/usergroup_json', {
        prm_ugr_id: ugr_id, req: JSON.stringify(req)
      });
  }

  // functions for a specific usergroup

  public loadPortals(): Observable<DbPortal[]> {
    return this.pg.pgcall('portal/portal_list', {
    });
  }

  public loadGroups(): Observable<DbGroupList[]> {
    return this.pg.pgcall('organ/group_list', {
      prm_org_id: null,
      prm_internal: true
    });
  }

  public addUsergroup(name: string): Observable<number> {
    return this.pg.pgcall('login/usergroup_add', {
      prm_name: name
    });
  }

  public setGroups(id: number, groups: number[]) {
    return this.pg.pgcall('login/usergroup_set_groups', {
      prm_ugr_id: id,
      prm_grp_ids: groups
    });
  }

  public setPortals(id: number, portals: number[]) {
    return this.pg.pgcall('login/usergroup_set_portals', {
      prm_ugr_id: id,
      prm_por_ids: portals
    });
  }



  public updateUsergroup(id: number, name: string) {
    return this.pg.pgcall('login/usergroup_rename', {
      prm_ugr_id: id,
      prm_name: name
    });
  }

  public deleteUsergroup(id: number) {
    return this.pg.pgcall('login/usergroup_delete', {
      prm_ugr_id: id
    });
  }
}
