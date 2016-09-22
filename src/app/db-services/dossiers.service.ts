import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import '../rxjs_operators';

import { DbDossier, DbGroup } from '../db-models/organ';
import { UserService } from '../shared/user.service';
import { PgService } from '../pg.service';

@Injectable()
export class DossiersService {

  constructor(private user: UserService, private pg: PgService) { }

  public loadDossiers(grouped: boolean, external: boolean): Observable<DbDossier[]> {
    let sourceDossiers = this.pg.pgcall(
      'organ/dossier_list', {
        prm_token: this.user.userData.token,
        prm_grouped: grouped,
        prm_external: external
    });
    return sourceDossiers;
  }

  public loadDossierAssignments(dosId: number): Observable<DbGroup[]> {
    return this.pg.pgcall(
      'organ/dossier_assignment_list', {
        prm_token: this.user.userData.token,
        prm_dos_id: dosId
      }
    );
  }

}
