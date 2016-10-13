import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { EventsTypesService, EventsTypesListDetails } from '../events-types.service';
import { EnumsService } from '../../../shared/enums.service';
import { TopicService } from '../../../shared/topic.service';
import { OrganService } from '../../../shared/organ.service';
import { DbTopic, DbOrganization } from '../../../db-models/organ';

@Component({
  selector: 'app-events-types-list',
  templateUrl: './events-types-list.component.html',
  styleUrls: ['./events-types-list.component.css']
})
export class EventsTypesListComponent implements OnInit {

  public categories: Observable<string[]>;
  public eventsTypesData: Observable<EventsTypesListDetails[]> = null;
  public topics: DbTopic[] = [];
  public organs: DbOrganization[] = [];

  public selectedId: Observable<number>;
  public selectedCat: string;

  constructor(private route: ActivatedRoute, private service: EventsTypesService,
    private enums: EnumsService, private router: Router,
    private topic: TopicService, public organ: OrganService) {
  }

  ngOnInit() {
    this.categories = this.enums.enum_list('events/event_category');
    this.selectedId = this.route.params.pluck<number>('selid');

    // TODO ZIP 2 requests then get cat params in subscribe
    this.topic.loadTopics().subscribe(topics => this.topics = topics);
    this.organ.loadOrganizations(true).subscribe(organs => this.organs = organs);

    this.route.params.pluck<string>('cat').subscribe(cat => {
      if (cat) {
        this.selectedCat = cat;
        this.eventsTypesData = this.service.loadEventsTypes(cat).map(etys => {
          return etys.map(ety => {
            ety.topics = ety.eventType.top_ids.map(top_id => {
              return this.topics.filter((t: DbTopic) => t.top_id === top_id).pop();
            });
            ety.organizations = ety.eventType.org_ids.map(org_id => {
              return this.organs.filter((o: DbOrganization) => o.org_id === org_id).pop();
            });
            return ety;
          });
        });
      } else {
        this.selectedCat = '';
        this.eventsTypesData = null;
      }
    });
  }
}
