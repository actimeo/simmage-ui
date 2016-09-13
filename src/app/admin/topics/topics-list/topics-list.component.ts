import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { TopicsService } from '../../../db-services/topics.service';
import { DbTopic } from '../../../db-models/organ';

@Component({
  selector: 'app-topics-list',
  templateUrl: './topics-list.component.html',
  styleUrls: ['./topics-list.component.css']
})
export class TopicsListComponent implements OnInit, OnDestroy {

  private topicsData: Observable<DbTopic[]> = null;

  private sub: Subscription;
  private selectedId: number;

  constructor(private topics: TopicsService, private route: ActivatedRoute) {
    this.topicsData = this.topics.topicsState;
  }

  ngOnInit() {
    this.sub = this.route
      .params
      .subscribe(params => {
        this.selectedId = +params['selid'];
        console.log('selid: ' + this.selectedId);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  isSelected(topic: DbTopic): boolean {
    return topic.top_id === this.selectedId;
  }
}
