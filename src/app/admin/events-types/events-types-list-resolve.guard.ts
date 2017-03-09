import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { EventsTypesService, EventsTypesListDetails } from './events-types.service';
import { TopicService } from '../../services/backend/topic.service';
import { OrganService } from '../../services/backend/organ.service';
import { DbTopic, DbOrganization } from '../../services/backend/db-models/organ';

export class EventsTypesListData {
  eventsTypes: EventsTypesListDetails[];
  topics: DbTopic[];
  organs: DbOrganization[];
}

@Injectable()
export class EventsTypesListResolve implements Resolve<EventsTypesListData> {

  constructor(
    public service: EventsTypesService,
    private topic: TopicService,
    public organ: OrganService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const cat = route.params['cat'];
    if (cat) {
      return this.getData(cat);
    }
  }

  public getData(cat: string) {
    return Observable.zip(
      this.topic.loadTopics(),
      this.organ.loadOrganizations(true),
      this.service.loadEventsTypes(cat),
      (topics: DbTopic[], organs: DbOrganization[], etys: EventsTypesListDetails[]) => {
        const eventsTypes = etys.map(ety => {
          ety.topics = ety.eventType.top_ids.map(top_id => {
            return topics.filter((t: DbTopic) => t.top_id === top_id).pop();
          });
          ety.organizations = ety.eventType.org_ids.map(org_id => {
            return organs.filter((o: DbOrganization) => o.org_id === org_id).pop();
          });
          return ety;
        });
        return {
          eventsTypes: eventsTypes,
          topics: topics,
          organs: organs
        };
      });
  }
}
