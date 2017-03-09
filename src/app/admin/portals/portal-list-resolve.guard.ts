import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { PortalsService } from '../../services/backend/portals.service';
import { DbPortal } from '../../services/backend/db-models/portal';

@Injectable()
export class PortalListResolve implements Resolve<DbPortal[]> {

  constructor(public portalsService: PortalsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DbPortal[]> {
    return this.portalsService.loadPortals();
  }

}
