import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../shared/user.service';
import { PgService } from '../../pg.service';
import { DbEventType } from '../../db-models/events';

@Injectable()
export class EventsTypesService {

  constructor(private user: UserService, private pg: PgService) { }

  public getEventsTypes(id: number): Observable<DbEventType> {
    return this.pg.pgcall('events/event_type_get', {
      prm_token: this.user.userData.token,
      prm_ety_id: id
    });
  }

  public updateEventsTypes(id: number, name: string, category: string): Observable<boolean> {
    return this.pg.pgcall('events/event_type_update', {
      prm_token: this.user.userData.token,
      prm_ety_id: id,
      prm_category: category,
      prm_name: name,
      prm_individual_name: false // TODO
    });
  }

  public addEventsTypes(name: string, category: string): Observable<number> {
    return this.pg.pgcall('events/event_type_add', {
      prm_token: this.user.userData.token,
      prm_category: category,
      prm_name: name,
      prm_individual_name: false // TODO
    });
  }

  public deleteEventsTypes(id: number) {
    return this.pg.pgcall('events/event_type_delete', {
      prm_token: this.user.userData.token,
      prm_ety_id: id
    });
  }

  public loadEventsTypes(): Observable<DbEventType[]> {
    return this.pg.pgcall('events/event_type_list', {
      prm_token: this.user.userData.token,
      prm_category: null
    });
  }
}
