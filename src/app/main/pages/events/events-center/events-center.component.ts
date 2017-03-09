import { EventsService } from './../../../../services/backend/events.service';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { DbMainmenu } from './../../../../services/backend/db-models/portal';

@Component({
  selector: 'app-events-center',
  templateUrl: './events-center.component.html',
  styleUrls: ['./events-center.component.css']
})
export class EventsCenterComponent implements OnInit {

  public mainmenu: Observable<DbMainmenu>;

  constructor(public eventsService: EventsService, private r: ActivatedRoute) { }

  ngOnInit() {
    this.mainmenu = this.r.data.pluck('data');
  }
}
