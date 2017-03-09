import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import '../../../rxjs_operators';

import { DbTopic } from '../../../services/backend/db-models/organ';

@Component({
  selector: 'app-topics-list',
  templateUrl: './topics-list.component.html',
  styleUrls: ['./topics-list.component.css']
})
export class TopicsListComponent implements OnInit {

  public topicsData: Observable<DbTopic[]> = null;
  public selectedId: Observable<number>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.topicsData = this.route.data.pluck('list');
    this.selectedId = this.route.params.pluck('selid');
  }
}
