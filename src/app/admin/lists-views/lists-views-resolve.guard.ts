import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { ListsViewsService } from './lists-views.service';

@Injectable()
export class ListsViewsResolve implements Resolve<any> {

  constructor(public service: ListsViewsService, public router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    const id = +route.params['id'];
    return this.service.getListsViews(id)
      .catch(e => {
        this.router.navigate(['/admin/lists-views']);
        return Observable.of(false);
      });
  }
}
