import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import '../../rxjs_operators';

import { UserService } from '../../shared/user.service';
import { PgService } from '../../pg.service';
import { OrganService } from '../organs/organ.service';

import { DbUsergroup } from '../../db-models/login';
import { DbPortal } from '../../db-models/portal';
import { DbGroupList } from '../../db-models/organ';
import { DbGroup } from '../../db-models/organ';

export class UsergroupData {
  public usergroup: DbUsergroup;

  public portals: DbPortal[];
  public groups: DbGroup[];
}

@Injectable()
export class UsergroupsService {

  // Observable to publish usergroups
  public usergroupsDataState: Observable<UsergroupData[]>;
  private usergroupsDataObserver: Subject<UsergroupData[]>;

  constructor(private user: UserService, private pg: PgService, private organ: OrganService) {
    // Create observable: it will send the data of usergroups
    this.usergroupsDataObserver = new Subject<UsergroupData[]>();
    this.usergroupsDataState = this.usergroupsDataObserver.asObservable();
  }

  /* We load the list of usergroups
   * then load related portals and groups for each usergroup
   */
  public loadUsergroups() {

    this.loadUsergroupList()
      .subscribe((usergroups: DbUsergroup[]) => {
        Observable.from(usergroups)
          .map((usergroup: DbUsergroup) => this.loadUsergroup(usergroup))
          .mergeAll()
          .reduce((a, b) => { return a.concat(b); }, [])
          .subscribe((a: UsergroupData[]) => {
            a.sort((x: UsergroupData, y: UsergroupData) => { return x.usergroup.ugr_name < y.usergroup.ugr_name ? 1 : -1; });
            this.usergroupsDataObserver.next(a);
          });
      });
  }

  private loadUsergroupList(): Observable<DbUsergroup[]> {
    return this.pg.pgcall(
      'login/usergroup_list', {
        prm_token: this.user.userData.token
      });
  }

  private loadUsergroup(usergroup: DbUsergroup): Observable<any> {
    return Observable.zip(
      this.loadUsergroupPortals(usergroup.ugr_id),
      this.loadUsergroupGroups(usergroup.ugr_id),

      function (ps: DbPortal[], gs: DbGroup[]): UsergroupData {
        let ugd: UsergroupData = new UsergroupData();
        ugd.usergroup = usergroup;
        ugd.portals = ps;
        ugd.groups = gs;
        return ugd;
      });
  }

  private loadUsergroupPortals(ugr_id: number): Observable<DbPortal[]> {
    return this.pg.pgcall(
      'login/usergroup_portal_list', {
        prm_token: this.user.userData.token,
        prm_ugr_id: ugr_id
      });
  }

  private loadUsergroupGroups(ugr_id: number): Observable<DbGroup[]> {
    return this.pg.pgcall(
      'login/usergroup_group_list', {
        prm_token: this.user.userData.token,
        prm_ugr_id: ugr_id
      });
  }

  // functions for a specific usergroup

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

  public addUsergroup(name: string): Observable<number> {
    return this.pg.pgcall('login/usergroup_add', {
      prm_token: this.user.userData.token,
      prm_name: name
    });
  }

  public setGroups(id: number, groups: number[]) {
    return this.pg.pgcall('login/usergroup_set_groups', {
      prm_token: this.user.userData.token,
      prm_ugr_id: id,
      prm_grp_ids: groups
    });
  }

  public setPortals(id: number, portals: number[]) {
    return this.pg.pgcall('login/usergroup_set_portals', {
      prm_token: this.user.userData.token,
      prm_ugr_id: id,
      prm_por_ids: portals
    });
  }

  public loadUsergroupFromId(id: number) {
    return Observable.zip(
      this.pg.pgcall('login/usergroup_get', {
        prm_token: this.user.userData.token,
        prm_ugr_id: id
      }),
      this.loadUsergroupPortals(id),
      this.loadUsergroupGroups(id),
      this.organ.loadOrganizations(true),

      function (usergroup: DbUsergroup, ps: DbPortal[], gs: any, organs: DbGroupList[]) {
        gs.forEach(g => {
          organs.forEach(o => {
            if (g.org_id === o.org_id) {
              g.org_name = o.org_name;
            }
          });
        });
        gs.sort((x, y) => { 
          return x.org_name < y.org_name ? -1 : 1; 
        }).sort((x, y) => {
          if (x.org_name === y.org_name) {
            return x.grp_name < y.grp_name ? -1 : 1;
          } 
        });

        return { usergroup: usergroup, portals: ps, groups: gs };
      });
  }

  public updateUsergroup(id: number, name: string) {
    return this.pg.pgcall('login/usergroup_rename', {
      prm_token: this.user.userData.token,
      prm_ugr_id: id,
      prm_name: name
    });
  }

  public deleteUsergroup(id: number) {
    return this.pg.pgcall('login/usergroup_delete', {
      prm_token: this.user.userData.token,
      prm_ugr_id: id
    });
  }
}
