import { DocumentJson } from './../db-models/json';
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

  public loadDocumentsInView(dov_id: number, grp_id: number): Observable<DocumentJson[]> {
    let req = {
      doc_id: true,
      doc_title: true,
      dty_name: true,
      topics: {
        top_id: true,
        top_name: true,
        top_icon: true,
        top_color: true
      },
      dossiers: {
        dos_id: true,
        dos_firstname: true,
        dos_lastname: true
      }
    };
    return this.pg.pgcall(
      'documents/document_in_view_list', {
        prm_dov_id: dov_id,
        prm_grp_id: grp_id,
        req: JSON.stringify(req)
      });
  }

  public loadViewTopics(dov_id: number): Observable<string[]> {
    return this.pg.pgcall('documents/documentsview_get_topics', { prm_id: dov_id });
  }
}
