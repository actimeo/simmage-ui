import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import '../rxjs_operators';

import { Constants } from '../constants';
import { PgService } from '../pg.service';
import { DbUserLogin } from '../db-models/login';
import { DbPortal } from '../db-models/portal';
import { DbGroup } from '../db-models/organ';

export class UserData {
  public loggedIn: boolean;
  public token: number;
  public rights: Array<string> = null;
  public usergroupId: number;
  public login: string;
  public firstname: string = '';
  public lastname: string = '';
  public portals: DbPortal[];
  public groups: DbGroup[];

  public selectedPorId: number;
  public selectedGrpId: number;

  public static buildFromLocalStorage() {
    let ret = new UserData(null);
    ret.loggedIn = !!localStorage.getItem(Constants.KEY_AUTH_TOKEN);
    if (ret.loggedIn) {
      ret.token = JSON.parse(localStorage.getItem(Constants.KEY_AUTH_TOKEN));
      ret.rights = JSON.parse(localStorage.getItem(Constants.KEY_AUTH_RIGHTS)) || [];
      ret.usergroupId = JSON.parse(localStorage.getItem(Constants.KEY_AUTH_UGR_ID));
      ret.login = JSON.parse(localStorage.getItem(Constants.KEY_AUTH_LOGIN)) || '';
      ret.firstname = JSON.parse(localStorage.getItem(Constants.KEY_AUTH_FIRSTNAME)) || '';
      ret.lastname = JSON.parse(localStorage.getItem(Constants.KEY_AUTH_LASTNAME)) || '';

      ret.selectedPorId = JSON.parse(localStorage.getItem(Constants.KEY_SEL_POR_ID)) || 0;
      ret.selectedGrpId = JSON.parse(localStorage.getItem(Constants.KEY_SEL_GRP_ID)) || 0;
    }
    return ret;
  }

  public constructor(res: DbUserLogin) {
    if (res !== null) {
      this.loggedIn = true;
      this.token = res.usr_token;
      this.rights = res.usr_rights || [];
      this.usergroupId = res.ugr_id;
      this.firstname = res.par_firstname || '';
      this.lastname = res.par_lastname || '';
      this.portals = [];
      this.groups = [];
      this.selectedPorId = JSON.parse(localStorage.getItem(Constants.KEY_SEL_POR_ID)) || 0;
      this.selectedGrpId = JSON.parse(localStorage.getItem(Constants.KEY_SEL_GRP_ID)) || 0;
    }
  }

  public saveToLocalStorage() {
    if (this.loggedIn) {
      localStorage.setItem(Constants.KEY_AUTH_TOKEN, JSON.stringify(this.token));
      localStorage.setItem(Constants.KEY_AUTH_RIGHTS, JSON.stringify(this.rights));
      localStorage.setItem(Constants.KEY_AUTH_UGR_ID, JSON.stringify(this.usergroupId));
      localStorage.setItem(Constants.KEY_AUTH_LOGIN, JSON.stringify(this.login));
      localStorage.setItem(Constants.KEY_AUTH_FIRSTNAME, JSON.stringify(this.firstname));
      localStorage.setItem(Constants.KEY_AUTH_LASTNAME, JSON.stringify(this.lastname));

      localStorage.setItem(Constants.KEY_SEL_POR_ID, JSON.stringify(this.selectedPorId));
      localStorage.setItem(Constants.KEY_SEL_GRP_ID, JSON.stringify(this.selectedGrpId));
    } else {
      localStorage.removeItem(Constants.KEY_AUTH_TOKEN);
      localStorage.removeItem(Constants.KEY_AUTH_RIGHTS);
      localStorage.removeItem(Constants.KEY_AUTH_RIGHTS);
      localStorage.removeItem(Constants.KEY_AUTH_UGR_ID);
      localStorage.removeItem(Constants.KEY_AUTH_LOGIN);
      localStorage.removeItem(Constants.KEY_AUTH_FIRSTNAME);
      localStorage.removeItem(Constants.KEY_AUTH_LASTNAME);
    }
  }

  public getFullName() {
    let ret = this.firstname + ' ' + this.lastname;
    return ret !== ' ' ? ret : '(' + this.login + ')';
  }

  public setPortals(res: DbPortal[]) {
    this.portals = res;
    if (this.portals.length === 1) {
      this.selectedPorId = this.portals[0].por_id;
    } else if (this.portals.length === 0) {
      this.selectedPorId = 0;
    }
    // TODO set selected = 0 if selected not in portals
    this.saveToLocalStorage();
  }

  public getPortals() {
    return this.portals;
  }

  public setGroups(res: DbGroup[]) {
    this.groups = res;
    if (this.groups.length === 1) {
      this.selectedGrpId = this.groups[0].grp_id;
    } else if (this.groups.length === 0) {
      this.selectedGrpId = 0;
    }
    // TODO set selected = 0 if selected not in groups
    this.saveToLocalStorage();
  }

  public getGroups() {
    return this.groups;
  }

  public hasRight(r: string) {
    return this.rights.indexOf(r) >= 0;

  }
}

/***************
 * UserService *
 ***************/
@Injectable()
export class UserService {

  public userData: UserData;

  public userDataState: Observable<UserData>;
  private userDataObserver: BehaviorSubject<UserData>;

  constructor(private pg: PgService) {
    this.userData = UserData.buildFromLocalStorage();
    if (this.userData.loggedIn) {
      this.loadUsergroupData(this.userData.usergroupId);
    }
    this.userDataObserver = new BehaviorSubject<UserData>(this.userData);
    this.userDataState = this.userDataObserver.asObservable();

    this.pg.badTokenEvents.subscribe(() => {
      this.logout();
    });
  }

  login(login: string, password: string): Observable<boolean> {

    return this.pg.pgcall(
      'login/user_login', {
        prm_login: login,
        prm_pwd: password,
        prm_rights: null
      })
      .map((res: DbUserLogin) => {
        console.log(res);
        this.userData = new UserData(res);
        this.userData.login = login;
        this.userData.saveToLocalStorage();
        this.propagate();

        this.loadUsergroupData(res.ugr_id);
        return true;
      });
  }

  private loadUsergroupData(ugrId: number) {
    this.getPortals(ugrId).subscribe(
      (result) => {
        this.propagate();
      },
      (error) => { }
    );

    this.getGroups(ugrId).subscribe(
      (result) => {
        this.propagate();
      },
      (error) => { }
    );
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
    this.userDataObserver.next(this.userData);
  }

  public isAdmin() {
    return this.isLoggedIn() && this.userData.rights != null && this.userData.rights.length > 0;
  }

  private getPortals(urgId: number): Observable<boolean> {
    return this.pg.pgcall(
      'login/usergroup_portal_list', {
        prm_token: this.userData.token,
        prm_ugr_id: urgId
      }).
      map((res: DbPortal[]) => {
        this.userData.setPortals(res);
        return true;
      });
  }

  private getGroups(urgId: number): Observable<boolean> {
    return this.pg.pgcall(
      'login/usergroup_group_list', {
        prm_token: this.userData.token,
        prm_ugr_id: urgId
      }).
      map((res: DbGroup[]) => {
        this.userData.setGroups(res);
        return true;
      });
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
}
