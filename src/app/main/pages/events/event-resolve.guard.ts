import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../../rxjs_operators';

import { EventService } from './../../../services/backend/event.service';

@Injectable()
export class EventResolve implements Resolve<any> {

  constructor(public service: EventService, public router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    const id = +route.params['id'];
    return this.service.getEvent(id);
  }
}
