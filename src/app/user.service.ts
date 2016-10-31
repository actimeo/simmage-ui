import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import './rxjs_operators';

import { UserData } from './data/user-data';
import { PgService } from './pg.service';

import { UserLoginJson } from './db-models/json';

/***************
 * UserService *
 ***************/
@Injectable()
export class UserService {

  public userData: UserData;

  public userDataState: BehaviorSubject<UserData>;

  constructor(public pg: PgService) {
    // Init data from local storage
    this.userData = UserData.buildFromLocalStorage();
    if (this.userData.loggedIn && this.userData.usergroupId > 0) {
      let req = {
        portals: {
          por_id: true,
          por_name: true
        },
        groups: {
          grp_id: true,
          grp_name: true
        }
      };
      this.pg.pgcall('login/usergroup_json', {
        prm_ugr_id: this.userData.usergroupId,
        req: JSON.stringify(req)
      }).subscribe(ugr => {
        this.userData.setPortals(ugr.portals);
        this.userData.setGroups(ugr.groups);
        this.propagate();
      });
    }

    // Start observable with initial value
    this.userDataState = new BehaviorSubject<UserData>(this.userData);

    this.listenBadTokens();
  }

  listenBadTokens() {
    this.pg.badTokenEvents.subscribe(() => {
      this.logout();
    });
  }

  login(login: string, password: string): Observable<boolean> {
    let req = {
      usr_token: true,
      usr_rights: true,
      usergroup: {
        ugr_id: true,
        groups: {
          grp_id: true,
          grp_name: true
        },
        portals: {
          por_id: true,
          por_name: true
        }
      },
      participant: {
        par_id: true,
        par_firstname: true,
        par_lastname: true
      }
    };
    return this.pg.pgcall(
      'login/user_login_json', {
        prm_login: login,
        prm_pwd: password,
        prm_rights: null,
        req: JSON.stringify(req)
      })
      .map((res: UserLoginJson) => {
        this.userData = new UserData(res);
        if (res.usergroup) {
          this.userData.setPortals(res.usergroup.portals);
          this.userData.setGroups(res.usergroup.groups);
        }
        this.userData.login = login;
        this.userData.saveToLocalStorage();
        this.propagate();
        return true;
      });
  }

  logout() {
    this.userData.loggedIn = false;
    this.userData.selectedPorId = 0;
    this.userData.selectedGrpId = 0;
    this.userData.saveToLocalStorage();
    this.propagate();
  }

  isLoggedIn() {
    return this.userData.loggedIn;
  }

  propagate() {
    this.userDataState.next(this.userData);
  }

  public isAdmin() {
    return this.isLoggedIn() && this.userData.rights != null && this.userData.rights.length > 0;
  }

  public isUser() {
    return this.isLoggedIn() && this.userData.usergroupId > 0;
  }

  public hasRight(r: string): boolean {
    return this.userData.hasRight(r);
  }

  public selectPortal(porId: number) {
    this.userData.selectedPorId = porId;
    this.userData.saveToLocalStorage();
    this.propagate();
  }

  public selectGroup(grpId: number) {
    this.userData.selectedGrpId = grpId;
    this.userData.saveToLocalStorage();
    this.propagate();
  }

  public getUserListDemo() {
    return this.pg.pgcall('login/user_list_demo', null);
  }
}
