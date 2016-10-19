import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { DocumentsViewsService } from './documents-views.service';

@Injectable()
export class DocumentsViewsResolve implements Resolve<any> {

  constructor(public service: DocumentsViewsService, public router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    let id = +route.params['id'];
    return this.service.getDocumentsViews(id)
      .catch(e => {
        this.router.navigate(['/admin/documents-views']);
        return Observable.of(false);
      });
  }
}
