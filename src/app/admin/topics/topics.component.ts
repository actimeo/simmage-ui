import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TopicsService } from '../../db-services/topics.service';
import { DbTopic } from '../../db-models/organ';

@Component({
  selector: 'app-topics',
  templateUrl: 'topics.component.html',
  styleUrls: ['topics.component.css']
})
export class TopicsComponent implements OnInit {

  private topicsData: Observable<DbTopic[]> = null;

  constructor(private topics: TopicsService) {
    this.topicsData = this.topics.topicsState;
   }

  ngOnInit() {
  }

}
