import { EventsService } from './../../../../shared/events.service';
import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
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
  
  private viewTopics: Observable<DbTopic[]>;
  private idSub: Subscription;
  private mainmenu: Observable<DbMainmenu>;
  private contentId: number;

  constructor(public eventsService: EventsService, private r: ActivatedRoute) { }

  ngOnInit() {
    this.mainmenu = this.r.data.pluck<DbMainmenu>('data');
    this.idSub = this.r.data.pluck<DbMainmenu>('data').distinctUntilChanged().subscribe(data => {
      this.contentId = data.mme_content_id;
      this.viewTopics = this.eventsService.loadViewTopics(this.contentId);
    });
  }

  ngOnChanges() {
    this.viewTopics = this.eventsService.loadViewTopics(this.contentId);
  }
  
  ngOnDestroy() {
    if (this.idSub) {
      this.idSub.unsubscribe();
    }
  }
}
