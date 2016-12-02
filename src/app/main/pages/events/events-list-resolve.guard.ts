import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../../rxjs_operators';

import { PortalsService } from '../../../portals.service';

@Injectable()
export class EventsListResolve implements Resolve<any> {

  constructor(public portalsService: PortalsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    let id = +route.params['viewid'];
    return this.portalsService.getMainmenu(id);
  }
}
