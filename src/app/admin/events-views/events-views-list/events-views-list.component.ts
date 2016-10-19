import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import '../../../rxjs_operators';

import { DbEventsviewGet } from '../../../db-models/events';

@Component({
  selector: 'app-events-views-list',
  templateUrl: './events-views-list.component.html',
  styleUrls: ['./events-views-list.component.css']
})
export class EventsViewsListComponent implements OnInit {

  public eventsViewsData: Observable<any[]>;
  public selectedId: Observable<number>;

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.eventsViewsData = this.route.data.pluck<DbEventsviewGet[]>('list');
    this.selectedId = this.route.params.pluck<number>('selid');
  }
}
