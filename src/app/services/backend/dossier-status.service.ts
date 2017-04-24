import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { DbDossier, DbGroup, DbDossierStatusHistory } from './db-models/organ';
import { UserService } from '../utils/user.service';
import { PgService } from './pg.service';

@Injectable()
export class DossierStatusService {

  constructor(private pg: PgService) { }

  public loadDossierStatusHistory(dos_id: number, org_id: number, status: string): Observable<DbDossierStatusHistory[]> {
    return this.pg.pgcall(
      'organ/dossier_status_history', {
        prm_dos_id: dos_id,
        prm_org_id: org_id,
        prm_status: status
      });
  }
}
