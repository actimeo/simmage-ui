import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { EventsViewsService } from './events-views.service';

@Injectable()
export class EventsViewsListResolve implements Resolve<any> {

  constructor(public service: EventsViewsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    return this.service.loadEventsViews();
  }
}
