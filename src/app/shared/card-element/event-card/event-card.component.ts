import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { EventJson } from '../../../services/backend/db-models/json';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {

  @Input() event: EventJson;

  constructor(public dialogRef: MdDialogRef<EventCardComponent>) { }

  ngOnInit() { }

  dialogAction(action: string) {
    this.dialogRef.close(action);
  }

}
