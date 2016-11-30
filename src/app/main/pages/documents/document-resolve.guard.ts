import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../../rxjs_operators';

import { DocumentsService } from './../../../shared/documents.service';

@Injectable()
export class DocumentResolve implements Resolve<any> {

	constructor(public service: DocumentsService, public router: Router) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
		let id = +route.params['id'];
		return Observable.of(true);
	}
}