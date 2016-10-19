import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { DocumentsViewsService } from './documents-views.service';

@Injectable()
export class DocumentsViewsListResolve implements Resolve<any> {

  constructor(public service: DocumentsViewsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    return this.service.loadDocumentsViews();
  }
}
