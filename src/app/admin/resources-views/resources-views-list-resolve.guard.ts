import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { ResourcesViewsService } from './resources-views.service';

@Injectable()
export class ResourcesViewsListResolve implements Resolve<any> {

  constructor(public service: ResourcesViewsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    return this.service.loadResourcesViews();
  }
}
