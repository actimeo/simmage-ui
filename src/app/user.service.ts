import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import './rxjs_operators';

import { PgService } from './pg.service';

@Injectable()
export class UserService {

  private loggedIn: boolean = false;
  private rights: Array<string> = null;

  public loggedInState: Observable<boolean>;
  private loggedInObserver: any;

  constructor(private pg: PgService) {
    this.loggedInState = new Observable<boolean>(observer => {
      this.loggedInObserver = observer;
      this.setLoggedIn(!!localStorage.getItem('auth_token'));
      this.rights = this.isLoggedIn() ?
        JSON.parse(localStorage.getItem('auth_rights')) : null;
    });
    this.loggedInState.subscribe();
  }

  login(email: string, password: string): Observable<boolean> {

    return this.pg.pgcall('login/user_login',
      { prm_login: email, prm_pwd: password, prm_rights: null })
      .map((res) => {
        localStorage.setItem('auth_token', res.usr_token);
        localStorage.setItem('auth_rights', JSON.stringify(res.usr_rights));
        this.setLoggedIn(true);
        this.rights = res.usr_rights;
        return true;
      });
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.setLoggedIn(false);
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  setLoggedIn(logged: boolean) {
    this.loggedIn = logged;
    this.loggedInObserver.next(logged);
  }

  public isAdmin() {
    return this.isLoggedIn() && this.rights != null && this.rights.length > 0;
  }
}
