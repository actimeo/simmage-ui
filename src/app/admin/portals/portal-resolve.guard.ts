import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { PortalsService } from '../../services/backend/portals.service';
import { DbPortal } from '../../services/backend/db-models/portal';

@Injectable()
export class PortalResolve implements Resolve<DbPortal> {

  constructor(public portalsService: PortalsService, public router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DbPortal> | any {
    let id = +route.params['id'];
    return this.portalsService.getPortal(id)
      .catch(e => {
        this.router.navigate(['/admin/portals']);
        return Observable.of(false);
      });
  }

}
