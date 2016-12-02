import { PgService } from './../../pg.service';
import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { PortalsService } from '../../portals.service';
import { DbPortal } from '../../db-models/portal';

@Injectable()
export class PagesResolve implements Resolve<DbPortal> {

  constructor(public pg: PgService, public portalsService: PortalsService, public router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DbPortal> | any {
    let id = +route.params['viewid'];
    return this.portalsService.getMainmenu(id);
  }
}