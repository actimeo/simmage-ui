import { Component, OnInit, trigger, state, animate, transition, style, Input, Output, EventEmitter } from '@angular/core';
import { EventJson } from '../../../services/backend/db-models/json';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css'],
  animations: [
    trigger('eventOnFocus', [
      state('true', style({ 'flex-basis': '100%'})),
      state('false', style({ })),
      transition('* => *', animate('250ms'))
    ])
  ]
})
export class EventsListComponent implements OnInit {

  @Input() events: EventJson[];

  focusedEvent: number;
  @Input() set focusOnEvent(event) {
    this.focusedEvent = event;
  }

  @Output() openForm: EventEmitter<number> = new EventEmitter();
  @Output() changeFocus: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  toggleFocus(id: number) {
    this.changeFocus.emit(id);
  }

  openEventForm(id: number) {
    this.openForm.emit(id);
  }

}
