import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../services/utils/user.service';
import { PgService } from '../../services/backend/pg.service';
import { DbEventType, DbEventTypeList } from '../../services/backend/db-models/events';
import { DbTopic, DbOrganization } from '../../services/backend/db-models/organ';

import { EventTypeJson } from '../../services/backend/db-models/json';

export interface EventsTypesListDetails {
  eventType: DbEventTypeList;
  topics: DbTopic[];
  organizations: DbOrganization[];
}

@Injectable()
export class EventsTypesService {

  constructor(private user: UserService, private pg: PgService) { }

  loadEventsTypesDetails(id: number): Observable<EventTypeJson[]> {
    const req = {
      ety_id: true,
      ety_name: true,
      ety_category: true,
      ety_individual_name: true,
      topics: {
        top_id: true,
        top_name: true,
        top_icon: true,
        top_color: true
      },
      organizations: {
        org_id: true,
        org_name: true,
        org_description: true
      }
    };
    return this.pg.pgcall('events/event_type_json', {
      prm_ety_id: id, req: JSON.stringify(req)
    });
  }

  public getEventsTypes(id: number): Observable<DbEventType> {
    return this.pg.pgcall('events/event_type_get', {
      prm_ety_id: id
    });
  }

  public updateEventsTypes(id: number, name: string, category: string,
    individualName: boolean, topics: number[], organizations: number[]): Observable<boolean> {
    return this.pg.pgcall('events/event_type_update_details', {
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
      prm_category: category,
      prm_name: name,
      prm_individual_name: individualName,
      prm_topics: topics,
      prm_organizations: organizations
    });
  }

  public deleteEventsTypes(id: number) {
    return this.pg.pgcall('events/event_type_delete', {
      prm_ety_id: id
    });
  }

  public loadEventsTypes(category: string): Observable<EventsTypesListDetails[]> {
    return this.pg.pgcall('events/event_type_list', {
      prm_category: category
    // Encapsulate result in EventsTypesListDetails
    }).map(etys => etys.map(ety => ({ eventType: ety, topics: [], organizations: [] })) );
  }

  private getTopics(id: number): Observable<DbTopic[]> {
    return this.pg.pgcall('events/event_type_topics_list', {
      prm_ety_id: id
    });
  }

  private getOrganizations(id: number): Observable<DbOrganization[]> {
    return this.pg.pgcall('events/event_type_organizations_list', {
      prm_ety_id: id
    });
  }
}
