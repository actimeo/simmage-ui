import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import '../../rxjs_operators';

export interface PgBatchCall {
  proc: string;
  args: any;
}

@Injectable()
export class PgService {

  public badTokenEvents: Subject<boolean> = new Subject<boolean>();
  public base: string;

  private userToken = null;

  constructor(private http: Http) {
    this.getBase();
  }

  public setToken(token) {
    this.userToken = token;
  }

  pgcall(url: string, args: any): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (this.userToken === null) {
      this.userToken = localStorage.getItem('auth_token');
    }

    if (args !== null) {
      args.prm_token = this.userToken;
    }

    return this.http.post(this.base + url, args, { headers })
      .do(() => { },
      (error: Response) => {
        let text: string = error.text();
        if (text.match(/insufficient_privilege/)) {
          this.badTokenEvents.next(true);
        }
        return Observable.throw(text);
      })
      .map(res => res.json());
  }

  pgbatch(calls: PgBatchCall[]) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (this.userToken === null) {
      this.userToken = localStorage.getItem('auth_token');
    }
    calls = calls.map(c => { c.args.prm_token = this.userToken; return c; });

    return this.http.post(this.base + 'batch', JSON.stringify(calls), { headers })
      .do(() => { },
      (error: Response) => {
        let text: string = error.text();
        if (text.match(/insufficient_privilege/)) {
          this.badTokenEvents.next(true);
        }
        return Observable.throw(text);
      })
      .map(res => res.json());
  }

  public getBase() {
    this.base = localStorage.getItem('pg_base') || '/pg/';
  }
}
