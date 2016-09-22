import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import '../../rxjs_operators';

import { UserService } from '../../shared/user.service';
import { PgService } from '../../pg.service';

import { DbUsergroup } from '../../db-models/login';
import { DbPortal } from '../../db-models/portal';
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

  constructor(private user: UserService, private pg: PgService) {
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
}
