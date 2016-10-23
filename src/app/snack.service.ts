import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

export interface SnackBarMessage {
  message: string;
  action: string;
};

@Injectable()
export class SnackService {

  public newMessage$: Subject<SnackBarMessage> = new Subject<SnackBarMessage>();

  constructor() { }

  public message(message: SnackBarMessage) {
    this.newMessage$.next(message);
  }
}
