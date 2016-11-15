import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { ListsViewsService } from './lists-views.service';

@Injectable()
export class ListsViewsListResolve implements Resolve<any> {

  constructor(public service: ListsViewsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    return this.service.loadListsViews();
  }
}
