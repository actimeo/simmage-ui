import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../user.service';
import { PgService } from '../../pg.service';
import { DbDocumentsviewGet } from '../../db-models/documents';

@Injectable()
export class DocumentsViewsService {

  constructor(private user: UserService, private pg: PgService) { }

  public getDocumentsViews(id: number): Observable<DbDocumentsviewGet> {
    return this.pg.pgcall('documents/documentsview_get', {
      prm_token: this.user.userData.token,
      prm_id: id
    });
  }

  public updateDocumentsViews(id: number, name: string, dty_id: number, top_ids: number[]): Observable<boolean> {
    return this.pg.pgcall('documents/documentsview_update', {
      prm_token: this.user.userData.token,
      prm_id: id,
      prm_name: name,
      prm_dty_id: dty_id,
      prm_top_ids: top_ids
    });
  }

  public addDocumentsViews(name: string, dty_id: number, top_ids: number[]): Observable<number> {
    return this.pg.pgcall('documents/documentsview_add', {
      prm_token: this.user.userData.token,
      prm_name: name,
      prm_dty_id: dty_id,
      prm_top_ids: top_ids
    });
  }

  public deleteDocumentsViews(id: number) {
    return this.pg.pgcall('documents/documentsview_delete', {
      prm_token: this.user.userData.token,
      prm_id: id
    });
  }

  public loadDocumentsViews(): Observable<any[]> {
    return this.pg.pgcall('documents/documentsview_list', {
      prm_token: this.user.userData.token
    });
  }
}
