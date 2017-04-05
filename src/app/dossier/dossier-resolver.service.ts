import { DossierInfoJson } from './../services/backend/db-models/json';
import { DossiersService } from './../services/backend/dossiers.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class DossierResolverService implements Resolve<DossierInfoJson> {

  constructor(private dossier: DossiersService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DossierInfoJson> {
    const id = route.params['id'];
    return this.dossier.getDossier(id);
  }
}
