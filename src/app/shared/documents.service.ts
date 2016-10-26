import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../user.service';
import { PgService } from '../pg.service';
import { DbDocumentTypeList } from '../db-models/documents';

@Injectable()
export class DocumentsService {

  constructor(private user: UserService, private pg: PgService) { }


  public filterDocumentsTypes(top_ids: number[]): Observable<DbDocumentTypeList[]> {
    return this.pg.pgcall('documents/document_type_filter', {
      prm_top_ids: top_ids
    });
  }
}
