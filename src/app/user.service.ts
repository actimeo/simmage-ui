import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import './rxjs_operators';

import { PgService } from './pg.service';

@Injectable()
export class UserService {

  private loggedIn: boolean = false;

  public loggedInState: Observable<boolean>;
  private loggedInObserver: any;

  constructor(private pg: PgService) {
    this.loggedInState = new Observable<boolean>(observer => {
      this.loggedInObserver = observer;
      this.setLoggedIn(!!localStorage.getItem('auth_token'));
    });
    this.loggedInState.subscribe();
  }

  login(email: string, password: string): Observable<boolean> {

    return this.pg.pgcall('login/user_login',
      { prm_login: email, prm_pwd: password, prm_rights: null })
      .map((res) => {
        localStorage.setItem('auth_token', res.usr_token);
        this.setLoggedIn(true);
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
}
