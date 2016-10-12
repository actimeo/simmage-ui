import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { EventsTypesService } from './events-types.service';

@Injectable()
export class EventsTypesResolve implements Resolve<any> {

  constructor(public service: EventsTypesService, public router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EventsTypesService> | any {
    let id = +route.params['id'];
    return this.service.getEventsTypes(id)
      .catch(e => {
        this.router.navigate(['/admin/events-types']);
        return Observable.of(false);
      });
  }
}
