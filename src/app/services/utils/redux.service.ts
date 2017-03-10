import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ReduxService {

  public sidenavClicked$ = new EventEmitter();
  public sidenavClicked() {
    this.sidenavClicked$.next();
  }

}
