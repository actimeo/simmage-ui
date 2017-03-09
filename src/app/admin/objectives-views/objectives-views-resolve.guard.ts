import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { ObjectivesViewsService } from './objectives-views.service';

@Injectable()
export class ObjectivesViewsResolve implements Resolve<any> {

  constructor(public service: ObjectivesViewsService, public router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    const id = +route.params['id'];
    return this.service.getObjectivesViews(id)
      .catch(e => {
        this.router.navigate(['/admin/objectives-views']);
        return Observable.of(false);
      });
  }
}
