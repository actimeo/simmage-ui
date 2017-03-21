import { UserData } from './../../../data/user-data';
import { UserService } from './../../../services/utils/user.service';
import { EventsService } from './../../../services/backend/events.service';
import { FormsDialogService } from './../../../services/utils/forms-dialog.service';
import { EventJson } from './../../../services/backend/db-models/json';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DbMainmenu } from './../../../services/backend/db-models/portal';
import { DbTopic } from './../../../services/backend/db-models/organ';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];
  events: EventJson[];
  viewTopics: DbTopic[];
  viewId: number;
  viewTitle: string;

  private currentGrpId: number = null;
  private contentId: number = null;

  constructor(public eventsService: EventsService, private user: UserService,
              private r: ActivatedRoute, private dialog: FormsDialogService) { }

  ngOnInit() {
    // Listen for group change
    const grpId$ = this.user.userDataState
      .map((u: UserData) => u.selectedGrpId)
      .distinctUntilChanged()
      .do((grpId: number) => {
        this.currentGrpId = grpId > 0 ? grpId : null;
      });

    // Listen for mainmenu change
    const mainmenu$ = this.r.data.pluck('data')
      .distinctUntilChanged()
      .do((mainmenu: DbMainmenu) => {
        this.viewId = mainmenu.mme_id;
        this.viewTitle = mainmenu.mme_title;
        this.contentId = mainmenu.mme_content_id;
        this.subs.push(this.eventsService.loadViewTopics(this.contentId)
          .subscribe(data => this.viewTopics = data));
      });

    this.subs.push(Observable.combineLatest(grpId$, mainmenu$)
      .subscribe(([grpId, mainmenu]: [number, DbMainmenu]) => {
        this.loadEvents();
      }));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private loadEvents() {
    this.subs.push(this.eventsService.loadEventsInView(this.contentId, this.currentGrpId)
      .subscribe(data => this.events = data));
  }

  openEventForm(event?: number) {
    this.subs.push(this.dialog.openEventForm({ viewId: this.viewId, contentId: this.contentId, eveId: event }).subscribe(event => {
      this.loadEvents();
    }));
  }
}
