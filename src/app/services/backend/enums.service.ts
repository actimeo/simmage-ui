import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { PgService } from './pg.service';

@Injectable()
export class EnumsService {

  constructor(public pg: PgService) { }

  enum_list(enumobj: string): Observable<string[]> {
    return this.pg.pgcall(enumobj + '_list', {});
  }
}
