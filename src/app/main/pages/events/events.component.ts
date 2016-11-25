import { UserData } from './../../../data/user-data';
import { UserService } from './../../../user.service';
import { EventsService } from './../../../shared/events.service';
import { EventJson } from './../../../db-models/json';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { DbMainmenu } from './../../../db-models/portal';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit, OnDestroy {

  @Input() mainmenu: DbMainmenu;

  private subs: Subscription[] = [];
  events: Observable<EventJson[]>;

  constructor(public eventsService: EventsService, private user: UserService) { }

  ngOnInit() {
    this.subs.push(this.user.userDataState
      .map((u: UserData) => u.selectedGrpId)
      .distinctUntilChanged()
      .subscribe(grpId => this.loadEvents(grpId)));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  loadEvents(grpId: number) {
    this.events = this.eventsService.loadEventsInView(this.mainmenu.mme_content_id, grpId > 0 ? grpId : null);
  }
}
