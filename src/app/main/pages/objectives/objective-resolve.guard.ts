import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../../rxjs_operators';

import { ObjectiveService } from './../../../services/backend/objective.service';

@Injectable()
export class ObjectiveResolve implements Resolve<any> {

  constructor(public service: ObjectiveService, public router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    const id = +route.params['id'];
    return this.service.getObjective(id);
  }

}
