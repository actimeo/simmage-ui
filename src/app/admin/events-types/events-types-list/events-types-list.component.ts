import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { PreferencesService } from '../../../shared/preferences.service';
import { EnumsService } from '../../../shared/enums.service';
import { EventsTypesListData } from '../events-types-list-resolve.guard';

@Component({
  selector: 'app-events-types-list',
  templateUrl: './events-types-list.component.html',
  styleUrls: ['./events-types-list.component.css']
})
export class EventsTypesListComponent implements OnInit {

  isTabular: boolean = false;
  public categories: Observable<string[]>;
  public selectedId: Observable<number>;
  public selectedCat: Observable<string>;
  public eventsTypesData: Observable<EventsTypesListData> = null;

  constructor(
    private route: ActivatedRoute,
    private enums: EnumsService,
    private prefs: PreferencesService) { }

  ngOnInit() {
    this.isTabular = this.prefs.getPrefBoolean('events-types', 'tabular');
    this.categories = this.enums.enum_list('events/event_category');
    this.selectedId = this.route.params.pluck<number>('selid');
    this.selectedCat = this.route.params.pluck<string>('cat');
    this.eventsTypesData = this.route.data.pluck<EventsTypesListData>('list');
  }

  setTabular(checked) {
    this.isTabular = checked;
    this.prefs.setPrefBoolean('events-types', 'tabular', this.isTabular);
  }
}
