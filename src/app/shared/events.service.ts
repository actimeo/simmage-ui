import { EventJson } from './../db-models/json';
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
      prm_categories: categories !== null ? categories : [],
      prm_top_ids: top_ids
    });
  }

  public loadEventsInView(evv_id: number, grp_id: number): Observable<EventJson[]> {
    let req = {
      eve_id: true,
      eve_title: true,
      ety_name: true,
      topics: {
        top_id: true,
        top_name: true,
        top_icon: true,
        top_color: true
      },
      dossiers: {
        dos_id: true,
        dos_firstname: true,
        dos_lastname: true
      }
    };
    return this.pg.pgcall(
      'events/event_in_view_list', {
        prm_evv_id: evv_id,
        prm_grp_id: grp_id,
        req: JSON.stringify(req)
      });
  }
}
