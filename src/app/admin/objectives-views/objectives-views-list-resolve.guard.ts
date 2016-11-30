import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { ObjectivesViewsService } from './objectives-views.service';

@Injectable()
export class ObjectivesViewsListResolve implements Resolve<any> {

  constructor(public service: ObjectivesViewsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    return this.service.loadObjectivesViews();
  }
}
