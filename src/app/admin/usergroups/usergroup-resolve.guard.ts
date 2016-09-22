import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { UsergroupsService } from './usergroups.service';
import { DbUsergroup } from '../../db-models/login';

@Injectable()
export class UsergroupResolve implements Resolve<DbUsergroup> {

  constructor(public usergroupsService: UsergroupsService, public router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    // let id = +route.params['id'];
    return this.usergroupsService.loadUsergroups();
  }
}
