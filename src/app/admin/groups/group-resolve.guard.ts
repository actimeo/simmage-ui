import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { GroupService } from './group.service';
import { DbGroup } from '../../services/backend/db-models/organ';

@Injectable()
export class GroupResolve implements Resolve<DbGroup> {

  constructor(public gs: GroupService, public router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    let id = +route.params['id'];
    return this.gs.loadGroup(id)
      .catch(e => {
        this.router.navigate(['/admin/groups']);
        return Observable.of(false);
      });
  }

}
