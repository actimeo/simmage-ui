import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../user.service';
import { PgService } from '../../pg.service';
import { DbEventsviewGet } from '../../db-models/events';

@Injectable()
export class EventsViewsService {

  constructor(private user: UserService, private pg: PgService) { }

  public getEventsViews(id: number): Observable<DbEventsviewGet> {
    return this.pg.pgcall('events/eventsview_get', {
      prm_token: this.user.userData.token,
      prm_id: id
    });
  }

  public updateEventsViews(id: number, name: string, categories: string[], ety_id: number, top_ids: number[]): Observable<boolean> {
    return this.pg.pgcall('events/eventsview_update', {
      prm_token: this.user.userData.token,
      prm_id: id,
      prm_name: name,
      prm_categories: categories,
      prm_ety_id: ety_id,
      prm_top_ids: top_ids
    });
  }

  public addEventsViews(name: string, categories: string[], ety_id: number, top_ids: number[]): Observable<number> {
    return this.pg.pgcall('events/eventsview_add', {
      prm_token: this.user.userData.token,
      prm_name: name,
      prm_categories: categories,
      prm_ety_id: ety_id,
      prm_top_ids: top_ids
    });
  }

  public deleteEventsViews(id: number) {
    return this.pg.pgcall('events/eventsview_delete', {
      prm_token: this.user.userData.token,
      prm_id: id
    });
  }

  public loadEventsViews(): Observable<any[]> {
    return this.pg.pgcall('events/eventsview_list', {
      prm_token: this.user.userData.token
    });
  }
}
