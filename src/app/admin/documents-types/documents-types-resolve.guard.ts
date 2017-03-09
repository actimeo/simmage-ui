import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { DocumentsTypesService } from './documents-types.service';

@Injectable()
export class DocumentsTypesResolve implements Resolve<any> {

  constructor(public service: DocumentsTypesService, public router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    const id = +route.params['id'];
    return this.service.loadDocumentsTypesDetails(id)
      .catch(e => {
        this.router.navigate(['/admin/documents-types']);
        return Observable.of(false);
      });
  }
}
