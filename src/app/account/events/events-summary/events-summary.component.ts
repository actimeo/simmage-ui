import { Component, OnInit, Input } from '@angular/core';
import { EventJson } from '../../../services/backend/db-models/json';

@Component({
  selector: 'app-events-summary',
  templateUrl: './events-summary.component.html',
  styleUrls: ['./events-summary.component.css']
})
export class EventsSummaryComponent implements OnInit {

  @Input() events: EventJson[];

  constructor() { }

  ngOnInit() {
  }

}
