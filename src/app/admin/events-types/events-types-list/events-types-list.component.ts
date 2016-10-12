import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { EventsTypesService } from '../events-types.service';
import { EnumsService } from '../../../shared/enums.service';
import { DbEventType } from '../../../db-models/events';

@Component({
  selector: 'app-events-types-list',
  templateUrl: './events-types-list.component.html',
  styleUrls: ['./events-types-list.component.css']
})
export class EventsTypesListComponent implements OnInit {

  public categories: Observable<string[]>;
  public eventsTypesData: Observable<DbEventType[]> = null;

  public selectedId: Observable<number>;
  public selectedCat: string;

  constructor(private route: ActivatedRoute, private service: EventsTypesService,
    private enums: EnumsService, private router: Router) {
  }

  ngOnInit() {
    this.categories = this.enums.enum_list('events/event_category');
    this.selectedId = this.route.params.pluck<number>('selid');
    this.route.params.pluck<string>('cat').subscribe(cat => {
      if (cat) {
        this.selectedCat = cat;
        this.eventsTypesData = this.service.loadEventsTypes(cat);
      } else {
        this.selectedCat = '';
        this.eventsTypesData = null;
      }
    });
  }
}
