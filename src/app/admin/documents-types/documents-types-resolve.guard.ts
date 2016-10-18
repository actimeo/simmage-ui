import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { DocumentsTypesService, DocumentsTypesDetails } from './documents-types.service';

@Injectable()
export class DocumentsTypesResolve implements Resolve<any> {

  constructor(public service: DocumentsTypesService, public router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DocumentsTypesDetails> | any {
    let id = +route.params['id'];
    return this.service.loadDocumentsTypesDetails(id)
      .catch(e => {
        this.router.navigate(['/admin/documents-types']);
        return Observable.of(false);
      });
  }
}
