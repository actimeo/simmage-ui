import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { DbDossier, DbGroup, DbDossierOrganizationStatus } from '../../db-models/organ';
import { UserService } from '../utils/user.service';
import { PgService } from './pg.service';

@Injectable()
export class DossiersService {

  private reqDetails = {
    dos_id: true,
    dos_firstname: true,
    dos_lastname: true,
    dos_birthdate: true,
    dos_gender: true,
    dos_grouped: true,
    dos_external: true,
    dos_groupname: true,
    dos_referee_functions: true,
    assignments: {
      grp_id: true,
      grp_name: true
    },
    statuses: {
      org_id: true,
      org_name: true,
      dst_value: true
    },
    related: {
      dos_id: true,
      dos_grouped: true,
      dos_firstname: true,
      dos_lastname: true,
      dos_groupname: true,
      dol_relationship: true
    }
  };

  private reqNameOnly = {
    dos_id: true,
    dos_firstname: true,
    dos_lastname: true,
    dos_groupname: true,
    dos_grouped: true
  };

  constructor(private pg: PgService) { }

  public loadDossiers(grouped: boolean, external: boolean, grpId: number, withDetails: boolean): Observable<DbDossier[]> {
    return this.pg.pgcall(
      'organ/dossier_list_json', {
        prm_grouped: grouped,
        prm_external: external,
        prm_grp_id: grpId > 0 ? grpId : null,
        prm_assigned_only: false,
        req: JSON.stringify(withDetails ? this.reqDetails : this.reqNameOnly)
      });
  }

  public loadParticipantDossiers(grouped: boolean, external: boolean, grpId: number): Observable<DbDossier[]> {
    return this.pg.pgcall(
      'organ/dossier_list_json', {
        prm_grouped: grouped,
        prm_external: external,
        prm_grp_id: grpId > 0 ? grpId : null,
        prm_assigned_only: true,
        req: JSON.stringify(this.reqDetails)
      });
  }
}
