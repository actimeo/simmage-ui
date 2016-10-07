import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { EventsTypesService } from '../events-types.service';
import { DbEventType } from '../../../db-models/events';

@Component({
  selector: 'app-events-types-list',
  templateUrl: './events-types-list.component.html',
  styleUrls: ['./events-types-list.component.css']
})
export class EventsTypesListComponent implements OnInit, OnDestroy {

  public eventsTypesData: Observable<DbEventType[]> = null;

  public sub: Subscription;
  public selectedId: number;

  constructor(private route: ActivatedRoute, private service: EventsTypesService) {
    this.eventsTypesData = this.service.loadEventsTypes();
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

  isSelected(eventsTypes: DbEventType): boolean {
    return eventsTypes.ety_id === this.selectedId;
  }
}
