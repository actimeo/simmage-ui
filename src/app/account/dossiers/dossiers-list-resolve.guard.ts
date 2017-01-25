import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DossiersService } from './../../dossiers.service';
import '../../rxjs_operators';

@Injectable()
export class DossiersListResolve implements Resolve<any> {

	constructor(public dossiersService: DossiersService) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
		return this.dossiersService.loadParticipantDossiers(false, false, null);
	}
}
