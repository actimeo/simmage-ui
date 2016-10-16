import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { GroupService } from './group.service';
import { DbGroup } from '../../db-models/organ';

@Injectable()
export class GroupListResolve implements Resolve<DbGroup[]> {

  constructor(public gs: GroupService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.gs.loadGroups();
  }

}
