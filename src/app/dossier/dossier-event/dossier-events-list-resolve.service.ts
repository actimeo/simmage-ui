import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { PortalsService } from '../../services/backend/portals.service';

@Injectable()
export class DossierEventsListResolve implements Resolve<any> {

	constructor(public portalsService: PortalsService) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
		const id = +route.params['viewid'];
		return this.portalsService.getPersonmenu(id);
	}
}