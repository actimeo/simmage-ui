import { Router, Event, NavigationEnd } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ReduxService {

  public sidenavClicked$ = new EventEmitter();
  public lastUrlBeforeDossier = '/';

  public constructor(private router: Router) {
    this.router.events.filter((event: Event) => event instanceof NavigationEnd)
      .filter((event: NavigationEnd) => !event.url.startsWith('/dossier/'))
      .subscribe((event: NavigationEnd) => this.lastUrlBeforeDossier = event.url);
  }

  public sidenavClicked() {
    this.sidenavClicked$.next();
  }

}
