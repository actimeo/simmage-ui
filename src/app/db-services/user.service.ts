import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import '../rxjs_operators';

import { UserData } from '../data/user-data';
import { PgService } from '../pg.service';
import { DbUserLogin } from '../db-models/login';
import { DbPortal } from '../db-models/portal';
import { DbGroup } from '../db-models/organ';


/***************
 * UserService *
 ***************/
@Injectable()
export class UserService {

  public userData: UserData;

  public userDataState: BehaviorSubject<UserData>;

  constructor(public pg: PgService) {
    console.log('user.service build');
    // Init data from local storage
    this.userData = UserData.buildFromLocalStorage();
    if (this.userData.loggedIn) {
      this.loadUsergroupData(this.userData.usergroupId);
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

    return this.pg.pgcall(
      'login/user_login', {
        prm_login: login,
        prm_pwd: password,
        prm_rights: null
      })
      .map((res: DbUserLogin) => {
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
      });

    this.getGroups(ugrId).subscribe(
      (result) => {
        this.propagate();
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

  public hasRight(r: string): boolean {
    return this.userData.hasRight(r);
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
