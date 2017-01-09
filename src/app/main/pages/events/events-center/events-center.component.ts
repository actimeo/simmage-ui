import { EventsService } from './../../../../shared/events.service';
import { Component, OnInit, OnChanges, OnDestroy, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { DbMainmenu } from './../../../../db-models/portal';
import { DbTopic } from './../../../../db-models/organ';

@Component({
  selector: 'app-events-center',
  templateUrl: './events-center.component.html',
  styleUrls: ['./events-center.component.css']
})
export class EventsCenterComponent implements OnInit, OnChanges, OnDestroy {

  public viewTopics: Observable<DbTopic[]>;
  private idSub: Subscription;
  public mainmenu: Observable<DbMainmenu>;
  private contentId: number;

  constructor(public eventsService: EventsService, private r: ActivatedRoute) { }

  ngOnInit() {
    this.mainmenu = this.r.data.pluck('data');
    this.idSub = this.r.data.pluck('data')
      .distinctUntilChanged().subscribe((data: DbMainmenu) => {
        this.contentId = data.mme_content_id;
        this.viewTopics = this.eventsService.loadViewTopics(this.contentId);
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.viewTopics = this.eventsService.loadViewTopics(this.contentId);
  }

  ngOnDestroy() {
    if (this.idSub) {
      this.idSub.unsubscribe();
    }
  }
}
