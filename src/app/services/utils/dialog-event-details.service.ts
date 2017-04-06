import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';

import { EventCardComponent } from '../../shared/card-element/event-card/event-card.component';
import { EventJson } from '../backend/db-models/json';

@Injectable()
export class DialogEventDetailsService {

  constructor(private dialog: MdDialog) { }

  public showEvent(event: EventJson): Observable<string> {

    let dialogRef: MdDialogRef<EventCardComponent>;

    dialogRef = this.dialog.open(EventCardComponent);
    dialogRef.componentInstance.event = event;

    return dialogRef.afterClosed(); 
  }

}
