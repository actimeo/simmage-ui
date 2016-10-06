import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { EventsTypesService } from '../events-types.service';

@Component({
  selector: 'app-events-types-list',
  templateUrl: './events-types-list.component.html',
  styleUrls: ['./events-types-list.component.css']
})
export class EventsTypesListComponent implements OnInit, OnDestroy {

  public eventsTypesData: Observable<any[]> = null;

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

  isSelected(eventsTypes: any): boolean {
    return eventsTypes.id === this.selectedId;
  }
}
