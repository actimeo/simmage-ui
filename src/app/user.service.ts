import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import './rxjs_operators';

import { PgService } from './pg.service';
import { DbUserLogin } from './db-models/login';

export class UserData {
  public loggedIn: boolean;
  public token: number;
  public rights: Array<string> = null;
  public firstname: string = '';
  public lastname: string = '';

  public static buildFromLocalStorage() {
    let ret = new UserData(null);
    ret.loggedIn = !!localStorage.getItem('auth_token');
    if (ret.loggedIn) {
      ret.token = JSON.parse(localStorage.getItem('auth_token'));
      ret.rights = JSON.parse(localStorage.getItem('auth_rights')) || [];
      ret.firstname = JSON.parse(localStorage.getItem('auth_firstname')) || '';
      ret.lastname = JSON.parse(localStorage.getItem('auth_lastname')) || '';
    }
    return ret;
  }

  public constructor(res: DbUserLogin) {
    if (res !== null) {
      this.loggedIn = true;
      this.token = res.usr_token;
      this.rights = res.usr_rights || [];
      this.firstname = res.par_firstname || '';
      this.lastname = res.par_lastname || '';
    }
  }

  public saveToLocalStorage() {
    if (this.loggedIn) {
      localStorage.setItem('auth_token', JSON.stringify(this.token));
      localStorage.setItem('auth_rights', JSON.stringify(this.rights));
      localStorage.setItem('auth_firstname', JSON.stringify(this.firstname));
      localStorage.setItem('auth_lastname', JSON.stringify(this.lastname));
    } else {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_rights');
      localStorage.removeItem('auth_firstname');
      localStorage.removeItem('auth_lastname');
    }
  }

  public getFullName() {
    return this.firstname + ' ' + this.lastname;
  }
}

@Injectable()
export class UserService {

  public userData: UserData;

  public loggedInState: Observable<boolean>;
  private loggedInObserver: any;

  constructor(private pg: PgService) {
    this.loggedInState = new Observable<boolean>(observer => {
      this.loggedInObserver = observer;
      this.userData = UserData.buildFromLocalStorage();
      this.propagate();
    });
    this.loggedInState.subscribe();
  }

  login(email: string, password: string): Observable<boolean> {

    return this.pg.pgcall('login/user_login',
      { prm_login: email, prm_pwd: password, prm_rights: null })
      .map((res: DbUserLogin) => {
        console.log(res);
        this.userData = new UserData(res);
        this.userData.saveToLocalStorage();
        this.propagate();
        return true;
      });
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
    this.loggedInObserver.next(this.userData.loggedIn);
  }

  public isAdmin() {
    return this.isLoggedIn() && this.userData.rights != null && this.userData.rights.length > 0;
  }
}
