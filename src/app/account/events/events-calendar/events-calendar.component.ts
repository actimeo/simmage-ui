import { Component, ChangeDetectionStrategy, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { EventJson } from '../../../services/backend/db-models/json';
import { EventService } from '../../../services/backend/event.service';
import { DialogEventDetailsService } from '../../../services/utils/dialog-event-details.service';

interface CalendarEventCustom extends CalendarEvent {
  event: EventJson;
}

@Component({
  selector: 'app-events-calendar',
  templateUrl: './events-calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./events-calendar.component.css']
})
export class EventsCalendarComponent implements OnChanges {

  @Input() eventsList: EventJson[];
  events: CalendarEventCustom[] = [];

  view: string = 'month';

  viewDate: Date = new Date();

  refresh: Subject<any> = new Subject();

  locale: string = localStorage.getItem('lang') || 'en';
  
  activeDayIsOpen: boolean = true;

  @Output() openForm: EventEmitter<number> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<number> = new EventEmitter();

  constructor(private dialog: DialogEventDetailsService, private service: EventService) { }

  ngOnChanges() {
    this.setEventsCalendar();
  }

  dayClicked({date, events}: {date: Date, events: CalendarEventCustom[]}): void {

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  setEventsCalendar() {
    this.events = [];
    this.eventsList.forEach(e => {
      let color = {
        primary: e.topics[0].top_color,
        secondary: e.topics[0].top_color
      };
      this.events.push({
        start: new Date(e.eve_start_time),
        title: e.eve_title,
        color: color,
        event: e
      });
    });
  }

  showDetails(event: EventJson) {
    this.dialog.showEvent(event).subscribe(action => {
      if (action === 'edit') {
        this.openForm.emit(event.eve_id);
      } else if (action === 'delete') {
        this.deleteEvent.emit(event.eve_id);
      }
    });
  }

}
