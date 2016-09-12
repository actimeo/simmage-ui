import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { TopicsService } from '../../db-services/topics.service';
import { DbTopic } from '../../db-models/organ';

@Component({
  selector: 'app-topics-list',
  templateUrl: './topics-list.component.html',
  styleUrls: ['./topics-list.component.css']
})
export class TopicsListComponent implements OnInit {

private topicsData: Observable<DbTopic[]> = null;

  constructor(private topics: TopicsService) {
    this.topicsData = this.topics.topicsState;
   }

  ngOnInit() {
  }

}
