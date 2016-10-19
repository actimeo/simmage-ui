import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { EventsViewsService } from './events-views.service';

@Injectable()
export class EventsViewsResolve implements Resolve<any> {

  constructor(public service: EventsViewsService, public router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    let id = +route.params['id'];
    return this.service.getEventsViews(id)
      .catch(e => {
        this.router.navigate(['/admin/events-views']);
        return Observable.of(false);
      });
  }
}
