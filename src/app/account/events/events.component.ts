import { Component, OnInit, trigger, state, animate, transition, style } from '@angular/core';
import { EventsService } from '../../shared/events.service';
import { Observable } from 'rxjs/Observable';
import { EventJson } from '../../db-models/json';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  animations: [
    trigger('eventOnFocus', [
      state('true', style({ 'flex-basis': '100%'})),
      state('false', style({ })),
      transition('* => *', animate('250ms'))
    ])
  ]
})
export class EventsComponent implements OnInit {

  private focusedEvent: number;

  events: EventJson[];

  constructor(private service: EventsService) { }

  ngOnInit() {
    this.service.loadEventsForUser().subscribe(events => this.events = events);
  }

  toggleFocus(id: number) {
    this.focusedEvent = this.focusedEvent !== id ? id : null;
  }

}
