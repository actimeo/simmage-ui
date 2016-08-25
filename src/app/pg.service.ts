import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import './rxjs_operators';

@Injectable()
export class PgService {

  private base: string;

  constructor(private http: Http) {
    this.base = localStorage.getItem('pg_base') || '/pg/';
  }

  pgcall(url: string, args: any): any {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.base + url, args, { headers })
      .map(res => res.json());
  }
}
