import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import './rxjs_operators';

import { PgService } from './pg.service';

@Injectable()
export class UserService {

  private loggedIn: boolean = false;

  constructor(private pg: PgService) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  login(email: string, password: string): Observable<boolean> {

    return this.pg.pgcall('login/user_login',
      { prm_login: email, prm_pwd: password, prm_rights: null })
      .map((res) => {
        localStorage.setItem('auth_token', res.usr_token);
        this.loggedIn = true;
        return true;
      });
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
