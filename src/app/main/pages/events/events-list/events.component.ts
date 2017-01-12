import { UserData } from './../../../../data/user-data';
import { UserService } from './../../../../user.service';
import { EventsService } from './../../../../shared/events.service';
import { EventJson } from './../../../../db-models/json';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnChanges, Input, OnDestroy, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DbMainmenu } from './../../../../db-models/portal';
import { DbTopic } from './../../../../db-models/organ';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];
  events: EventJson[];
  viewTopics: DbTopic[];

  private currentGrpId: number = null;
  private contentId: number = null;

  constructor(public eventsService: EventsService, private user: UserService, private r: ActivatedRoute) { }

  ngOnInit() {
    // Listen for group change
    this.subs.push(this.user.userDataState
      .map((u: UserData) => u.selectedGrpId)
      .distinctUntilChanged()
      .subscribe(grpId => {
        this.currentGrpId = grpId > 0 ? grpId : null;
        this.loadEvents();
      }));

    // Listen for mainmenu change
    this.subs.push(this.r.data.pluck('data')
      .distinctUntilChanged().subscribe((data: DbMainmenu) => {
        this.contentId = data.mme_content_id;
        this.eventsService.loadViewTopics(this.contentId)
          .subscribe(data => this.viewTopics = data);
        this.loadEvents();
      }));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private loadEvents() {
    this.eventsService.loadEventsInView(this.contentId, this.currentGrpId)
      .subscribe(data => this.events = data);
  }
}
