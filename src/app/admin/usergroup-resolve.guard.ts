import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../rxjs_operators';

import { UsergroupsService } from '../db-services/usergroups.service';
import { DbGroupList } from '../db-models/organ';

@Injectable()
export class UsergroupResolve implements Resolve<DbGroupList> {

  constructor(public topicService: UsergroupsService, public router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    let id = +route.params['id'];
    return this.topicService.loadUsergroups();
  }
}
