import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  private loggedIn: boolean = false;
  private base: string;

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
    this.base = localStorage.getItem('pg_base') || '/pg/';
    console.log(this.base);
  }

  login(email: string, password: string): Observable<boolean> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(this.base + 'login/user_login',
      JSON.stringify({ prm_login: email, prm_pwd: password, prm_rights: null }),
      { headers }
      )
      .map(res => res.json())
      .map((res) => {
        console.log(res);
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
