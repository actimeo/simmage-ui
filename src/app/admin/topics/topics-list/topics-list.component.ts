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

  public topicsData: Observable<DbTopic[]> = null;

  public sub: Subscription;
  public selectedId: number;

  constructor(private topics: TopicsService, private route: ActivatedRoute) {
    this.topicsData = this.topics.topicsState;
  }

  ngOnInit() {
    this.sub = this.route.params
      .filter(params => !isNaN(params['selid']))
      .subscribe(params => {
        this.selectedId = +params['selid'];
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  isSelected(topic: DbTopic): boolean {
    return topic.top_id === this.selectedId;
  }
}
