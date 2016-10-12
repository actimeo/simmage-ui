import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../shared/user.service';
import { PgService } from '../../pg.service';
import { DbEventType } from '../../db-models/events';
import { DbTopic, DbOrganization } from '../../db-models/organ';

export interface EventsTypesDetails {
  eventType: DbEventType;
  topics: DbTopic[];
  organizations: DbOrganization[];
}

@Injectable()
export class EventsTypesService {

  constructor(private user: UserService, private pg: PgService) { }

  loadEventsTypesDetails(id: number): Observable<any> {
    return Observable.zip(
      this.getEventsTypes(id),
      this.getTopics(id),
      this.getOrganizations(id),

      function (g: DbEventType, ts: DbTopic[], orgs: DbOrganization[]): EventsTypesDetails {
        return { eventType: g, topics: ts, organizations: orgs };
      });
  }

  public getEventsTypes(id: number): Observable<DbEventType> {
    return this.pg.pgcall('events/event_type_get', {
      prm_token: this.user.userData.token,
      prm_ety_id: id
    });
  }

  public updateEventsTypes(id: number, name: string, category: string,
    individualName: boolean, topics: number[], organizations: number[]): Observable<boolean> {
    return this.pg.pgcall('events/event_type_update_details', {
      prm_token: this.user.userData.token,
      prm_ety_id: id,
      prm_category: category,
      prm_name: name,
      prm_individual_name: individualName,
      prm_topics: topics,
      prm_organizations: organizations
    });
  }

  public addEventsTypes(name: string, category: string,
    individualName: boolean, topics: number[], organizations: number[]): Observable<number> {
    return this.pg.pgcall('events/event_type_add_details', {
      prm_token: this.user.userData.token,
      prm_category: category,
      prm_name: name,
      prm_individual_name: individualName,
      prm_topics: topics,
      prm_organizations: organizations
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

  private getTopics(id: number): Observable<DbTopic[]> {
    return this.pg.pgcall('events/event_type_topics_list', {
      prm_token: this.user.userData.token,
      prm_ety_id: id
    });
  }

  private getOrganizations(id: number): Observable<DbOrganization[]> {
    return this.pg.pgcall('events/event_type_organizations_list', {
      prm_token: this.user.userData.token,
      prm_ety_id: id
    });
  }
}
