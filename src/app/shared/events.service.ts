import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../user.service';
import { PgService } from '../pg.service';
import { DbEventTypeList } from '../db-models/events';

@Injectable()
export class EventsService {

  constructor(private user: UserService, private pg: PgService) { }


  public filterEventsTypes(categories: string[], top_ids: number[]): Observable<DbEventTypeList[]> {
    return this.pg.pgcall('events/event_type_filter', {
      prm_token: this.user.userData.token,
      prm_categories: categories,
      prm_top_ids: top_ids
    });
  }
}
