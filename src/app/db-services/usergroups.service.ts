import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import '../rxjs_operators';

import { UserService } from './user.service';
import { PgService } from '../pg.service';

import { DbUsergroup } from '../db-models/login';
import { DbPortal } from '../db-models/portal';
import { DbGroup } from '../db-models/organ';

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
    // Create observable: it will send the data of new selected portal
    this.usergroupsDataObserver = new Subject<UsergroupData[]>();
    this.usergroupsDataState = this.usergroupsDataObserver.asObservable();

    this.loadUsergroups();
  }

  /* We create a UsergroupData structure with the provided porId,
     * then load mainsections and store them in structure
     * then load mainmenus in parallel and store them in structure.
     * At the end we push the complete structure with Observable
     * */
  private loadUsergroups() {

    this.loadUsergroupList()
      .subscribe((usergroups: DbUsergroup[]) => {
        console.log('1');
        // load in parallel mainmenus from mainsections
        // then merge them all in a single array
        let res = Observable.from(usergroups)
          .map((usergroup: DbUsergroup) => this.loadUsergroup(usergroup))
          .mergeAll()
          .reduce((a, b) => { return a.concat(b); }, [])
          .subscribe((a) => {
            console.log(a);
            this.usergroupsDataObserver.next(a);
          });
      });
  }

  private loadUsergroupList() {
    let source = this.pg.pgcall(
      'login/usergroup_list', {
        prm_token: this.user.userData.token
      });
    return source;
  }

  private loadUsergroup(usergroup: DbUsergroup) {
    let ug: UsergroupData = new UsergroupData();
    ug.usergroup = usergroup;

    return Observable.zip(
      this.loadUsergroupPortals(usergroup.ugr_id),
      this.loadUsergroupGroups(usergroup.ugr_id),
      function (ps, gs) {
        let ugd: UsergroupData = new UsergroupData();
        ugd.usergroup = usergroup;
        ugd.portals = ps;
        ugd.groups = gs;
        return ugd;
      });
  }

  private loadUsergroupPortals(ugr_id: number) {
    let source = this.pg.pgcall(
      'login/usergroup_portal_list', {
        prm_token: this.user.userData.token,
        prm_ugr_id: ugr_id
      });
    return source;
  }

  private loadUsergroupGroups(ugr_id: number) {
    let source = this.pg.pgcall(
      'login/usergroup_group_list', {
        prm_token: this.user.userData.token,
        prm_ugr_id: ugr_id
      });
    return source;
  }
}
