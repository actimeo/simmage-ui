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
  @Input() hourSegments: number = 2;
  events: CalendarEventCustom[] = [];

  view: string = 'month';

  viewDate: Date = new Date();

  colors: any = {
    expense: {
      primary: '#1976d2',
      secondary: '#bbdefb'
    },
    incident: {
      primary: '#d32f2f',
      secondary: '#ffcdd2'
    },
    meeting: {
      primary: '#388e3c',
      secondary: '#c8e6c9'
    },
    absence: {
      primary: '#fbc02d',
      secondary: '#fff9c4'
    },
    other : {
      primary: '#f57c00',
      secondary: '#ffe0b2'
    }
  };

  locale: string = localStorage.getItem('lang') || 'en';

  activeDayIsOpen: boolean = true;

  @Output() openForm: EventEmitter<number> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<number> = new EventEmitter();

  constructor(private dialog: DialogEventDetailsService, private service: EventService) { }

  ngOnChanges() {
    if (this.eventsList) {
      this.setEventsCalendar();
    }
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
      const color = {
        primary: e.ety_category ? this.colors[e.ety_category].primary : this.colors['other'].primary,
        secondary: e.ety_category ? this.colors[e.ety_category].secondary : this.colors['other'].secondary
      };
      this.events.push({
        start: new Date(e.eve_start_time),
        end: e.eve_end_time ? new Date(e.eve_end_time) : addHours(new Date(e.eve_start_time), 1),
        title: e.eve_title,
        color: color,
        event: e,
        allDay: e.eve_duration === 'allday'
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
