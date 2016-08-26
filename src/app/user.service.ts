import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import './rxjs_operators';

import { PgService } from './pg.service';
import { DbUserLogin } from './db-models/login';
import { DbPortal } from './db-models/portal';
import { DbGroup } from './db-models/organ';

export class UserData {
  public loggedIn: boolean;
  public token: number;
  public rights: Array<string> = null;
  public usergroupId: number;
  public firstname: string = '';
  public lastname: string = '';
  public portals: DbPortal[];
  public groups: DbGroup[];

  public selectedPorId: number;
  public selectedGrpId: number;

  public static buildFromLocalStorage() {
    let ret = new UserData(null);
    ret.loggedIn = !!localStorage.getItem('auth_token');
    if (ret.loggedIn) {
      ret.token = JSON.parse(localStorage.getItem('auth_token'));
      ret.rights = JSON.parse(localStorage.getItem('auth_rights')) || [];
      ret.usergroupId = JSON.parse(localStorage.getItem('auth_ugr_id'));
      ret.firstname = JSON.parse(localStorage.getItem('auth_firstname')) || '';
      ret.lastname = JSON.parse(localStorage.getItem('auth_lastname')) || '';

      ret.selectedPorId = JSON.parse(localStorage.getItem('sel_por_id')) || 0;
      ret.selectedGrpId = JSON.parse(localStorage.getItem('sel_grp_id')) || 0;
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
      this.selectedPorId = JSON.parse(localStorage.getItem('sel_por_id')) || 0;
      this.selectedGrpId = JSON.parse(localStorage.getItem('sel_grp_id')) || 0;
    }
  }

  public saveToLocalStorage() {
    if (this.loggedIn) {
      localStorage.setItem('auth_token', JSON.stringify(this.token));
      localStorage.setItem('auth_rights', JSON.stringify(this.rights));
      localStorage.setItem('auth_ugr_id', JSON.stringify(this.usergroupId));
      localStorage.setItem('auth_firstname', JSON.stringify(this.firstname));
      localStorage.setItem('auth_lastname', JSON.stringify(this.lastname));

      localStorage.setItem('sel_por_id', JSON.stringify(this.selectedPorId));
      localStorage.setItem('sel_grp_id', JSON.stringify(this.selectedGrpId));
    } else {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_rights');
      localStorage.removeItem('auth_rights');
      localStorage.removeItem('auth_ugr_id');
      localStorage.removeItem('auth_firstname');
      localStorage.removeItem('auth_lastname');
    }
  }

  public getFullName() {
    return this.firstname + ' ' + this.lastname;
  }

  public setPortals(res: DbPortal[]) {
    this.portals = res;
    if (this.portals.length === 1) {
      this.selectedPorId = this.portals[0].por_id;
    }
    this.saveToLocalStorage();
  }

  public getPortals() {
    return this.portals;
  }

  public setGroups(res: DbGroup[]) {
    this.groups = res;
    if (this.groups.length === 1) {
      this.selectedGrpId = this.groups[0].grp_id;
    }
    this.saveToLocalStorage();
  }

  public getGroups() {
    return this.groups;
  }
}

@Injectable()
export class UserService {

  public userData: UserData;

  public userDataState: Observable<UserData>;
  private userDataObserver: any;

  constructor(private pg: PgService) {
    this.userDataState = new Observable<UserData>(observer => {
      this.userDataObserver = observer;
      this.userData = UserData.buildFromLocalStorage();
      this.propagate();
      this.loadUsergroupData(this.userData.usergroupId);
    }).share();
  }

  login(email: string, password: string): Observable<boolean> {

    return this.pg.pgcall(
      'login/user_login', {
        prm_login: email,
        prm_pwd: password,
        prm_rights: null
      })
      .map((res: DbUserLogin) => {
        this.userData = new UserData(res);
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
