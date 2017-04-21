import { UserData } from './../../data/user-data';
import { UserService } from './../../services/utils/user.service';
import { EventsService } from './../../services/backend/events.service';
import { FormsDialogService } from './../../services/utils/forms-dialog.service';
import { EventJson, DossierInfoJson } from './../../services/backend/db-models/json';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DbPersonmenu } from './../../services/backend/db-models/portal';
import { DbTopic } from './../../services/backend/db-models/organ';
import { EventsReportComponent } from '../../shared/events-display/events-report/events-report.component';

@Component({
  selector: 'app-dossier-event',
  templateUrl: './dossier-event.component.html',
  styleUrls: ['./dossier-event.component.css']
})
export class DossierEventComponent implements OnInit, OnDestroy {

  @ViewChild(EventsReportComponent) eventsReport: EventsReportComponent;

  private subs: Subscription[] = [];
  events: EventJson[];
  viewTopics: DbTopic[];
  viewTitle: string;

  dossier: number;

  private focusedEvent: number;

  eventsDisplay: string = 'calendar';

  private contentId: number = null;

  constructor(public eventsService: EventsService, private user: UserService,
              private r: ActivatedRoute, private dialog: FormsDialogService) { }

  ngOnInit() {
    const dossier$ = this.r.data.pluck('data')
      .distinctUntilChanged()
      .do((dossier: DossierInfoJson) => {
        this.dossier = dossier.dos_id;
      });

    const personmenu$ = this.r.data.pluck('dataMenu')
      .distinctUntilChanged()
      .do((personmenu: DbPersonmenu) => {
        this.viewTitle = personmenu.pme_title;
        this.contentId = personmenu.pme_content_id;
        this.subs.push(this.eventsService.loadViewTopics(this.contentId)
          .subscribe(data => this.viewTopics = data));
      });

    this.subs.push(Observable.combineLatest(dossier$, personmenu$)
      .subscribe(([dossier, personmenu]: [DossierInfoJson, DbPersonmenu]) => {
        if (this.eventsDisplay === 'report') {
          this.eventsReport.loadReports();
        }
        this.loadEvents();
      }));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  toggleFocus(id: number) {
    this.focusedEvent = this.focusedEvent !== id ? id : null;
  }

  private loadEvents() {
    this.subs.push(this.eventsService.loadEventsDossier(this.dossier, this.contentId)
      .subscribe(data => this.events = data));
  }

  openEventForm(id = null) {
    this.subs.push(this.dialog.openEventForm({ contentId: this.contentId, eveId: id}).subscribe(event => {
      if (event) {
        this.loadEvents();
        this.focusedEvent = event;
      }
    }));
  }
}
