import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import './rxjs_operators';

import { DbDossier, DbGroup, DbDossierOrganizationStatus } from './db-models/organ';
import { UserService } from './user.service';
import { PgService } from './pg.service';

@Injectable()
export class DossiersService {

  constructor(private user: UserService, private pg: PgService) { }

  public loadDossiers(grouped: boolean, external: boolean, grpId: number): Observable<DbDossier[]> {
    let sourceDossiers = this.pg.pgcall(
      'organ/dossier_list', {
        prm_grouped: grouped,
        prm_external: external,
        prm_grp_id: grpId > 0 ? grpId : null,
        prm_assigned_only: false
      });
    return sourceDossiers;
  }

  public loadDossierAssignments(dosId: number): Observable<DbGroup[]> {
    return this.pg.pgcall(
      'organ/dossier_assignment_list', {
        prm_dos_id: dosId
      }
    );
  }

  public loadDossierStatuses(dosId: number): Observable<DbDossierOrganizationStatus[]> {
    return this.pg.pgcall(
      'organ/dossier_status_list', {
        prm_dos_id: dosId,
        prm_when: '26/09/2016'
      }
    );
  }

}
