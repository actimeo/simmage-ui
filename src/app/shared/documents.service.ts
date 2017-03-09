import { DocumentJson } from './../db-models/json';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../services/utils/user.service';
import { PgService } from '../services/backend/pg.service';
import { DbDocumentTypeList } from '../db-models/documents';
import { DbTopic } from '../db-models/organ';

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

  public loadViewTopics(dov_id: number): Observable<any[]> {
    return this.pg.pgcall('documents/documentsview_get_topics', { prm_id: dov_id });
  }

  public loadDocumentsForUser() {
    let req = {
      doc_id: true,
      doc_title: true,
      dty_name: true,
      doc_description: true,
      doc_creation_date: true,
      author: {
        par_id: true,
        par_lastname: true,
        par_firstname: true
      },
      responsible: {
        par_id: true,
        par_lastname: true,
        par_firstname: true
      },
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

    return this.pg.pgcall('documents/document_participant_list', {
      req: JSON.stringify(req)
    });
  }
}
