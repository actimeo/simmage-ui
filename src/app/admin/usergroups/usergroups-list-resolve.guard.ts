import { UsergroupJson } from './../../services/backend/db-models/json';
import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { UsergroupsService } from './usergroups.service';
import { DbUsergroup } from '../../services/backend/db-models/login';

@Injectable()
export class UsergroupsResolve implements Resolve<UsergroupJson[]> {

  constructor(public ugs: UsergroupsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    return this.ugs.loadUsergroups(null);
  }
}
