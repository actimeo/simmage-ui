import { UserData } from './../../../../data/user-data';
import { UserService } from './../../../../user.service';
import { EventsService } from './../../../../shared/events.service';
import { EventJson } from './../../../../db-models/json';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnChanges, Input, OnDestroy, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DbMainmenu } from './../../../../db-models/portal';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit, OnChanges, OnDestroy {

  private subs: Subscription[] = [];
  events: Observable<EventJson[]>;
  private currentGrpId: number = null;
  private contentId: number;
  private viewId: number;

  constructor(public eventsService: EventsService, private user: UserService, private r: ActivatedRoute) { }

  ngOnInit() {
    this.subs.push(this.user.userDataState
      .map((u: UserData) => u.selectedGrpId)
      .distinctUntilChanged()
      .subscribe(grpId => {
        this.currentGrpId = grpId > 0 ? grpId : null;
      }));
    this.subs.push(this.r.data.pluck<DbMainmenu>('data').distinctUntilChanged().subscribe(data => {
      this.viewId = data.mme_id;
      this.contentId = data.mme_content_id;
      this.events = this.eventsService.loadEventsInView(this.contentId, this.currentGrpId);
    }));
  }

  ngOnChanges(changes: SimpleChanges) {
    this.events = this.eventsService.loadEventsInView(this.contentId, this.currentGrpId);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
