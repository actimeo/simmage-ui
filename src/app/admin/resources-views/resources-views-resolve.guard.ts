import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { ResourcesViewsService } from './resources-views.service';

@Injectable()
export class ResourcesViewsResolve implements Resolve<any> {

  constructor(public service: ResourcesViewsService, public router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    let id = +route.params['id'];
    return this.service.getResourcesViews(id)
      .catch(e => {
        this.router.navigate(['/admin/resources-views']);
        return Observable.of(false);
      });
  }
}
