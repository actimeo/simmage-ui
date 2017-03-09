import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { OrganService } from '../../services/backend/organ.service';
import { DbOrganization } from '../../services/backend/db-models/organ';

@Injectable()
export class OrganResolve implements Resolve<DbOrganization> {

  constructor(private organService: OrganService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Observable<DbOrganization> | any {
    const id = +route.params['id'];
    return this.organService.loadOrgan(id)
      .catch(e => {
        this.router.navigate(['/admin/organs']);
        return Observable.of(false);
      });
  }
}
