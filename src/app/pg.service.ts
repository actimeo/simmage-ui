import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import './rxjs_operators';

@Injectable()
export class PgService {

  public badTokenEvents: Subject<boolean> = new Subject<boolean>();
  private base: string;

  constructor(private http: Http) {
    this.base = localStorage.getItem('pg_base') || '/pg/';
  }

  pgcall(url: string, args: any): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.base + url, args, { headers })
      .do(() => { },
      (error) => this.badTokenEvents.next(true)
      )
      .map(res => res.json());
  }
}
