import { Injectable } from '@angular/core';
import { DocumentJson } from './../../../db-models/json';
import { Observable } from 'rxjs/Observable';
import { PgService } from './../../../pg.service';


@Injectable()
export class DocumentService {

  constructor(private pg: PgService) { }

  public getDocument(doc_id: number): Observable<DocumentJson> {
    let req = {
      doc_id: true,
      par_id_responsible: true,
      dty_id: true,
      doc_title: true,
      doc_description: true,
      doc_status: true,
      doc_obtainment_date: true,
      doc_execution_date: true,
      doc_validity_date: true,
      //doc_file: true,
      topics: {
        top_id: true,
      },
      dossiers: {
        dos_id: true,
      }
    };
    return this.pg.pgcall('documents/document_json', {
      prm_doc_ids: [doc_id],
      req: JSON.stringify(req)
    });
  }

  public addDocument(par_id_responsible: number, dty_id: number, doc_title: string, doc_description: string,
                      doc_status: string, doc_obtainment_date: string, doc_execution_date: string, doc_validity_date: string,
                      /*file: string, */topics: number[], dossiers: number[]): Observable<number> {
    return this.pg.pgcall('documents/document_add', {
      prm_par_id_responsible: par_id_responsible,
      prm_dty_id: dty_id,
      prm_title: doc_title,
      prm_description: doc_description,
      prm_status: doc_status,
      prm_obtainment_date: doc_obtainment_date,
      prm_execution_date: doc_execution_date,
      prm_validity_date: doc_validity_date,
      prm_file: null,
      prm_topics: topics,
      prm_dossiers: dossiers
    });
  }

  public updateDocument(doc_id: number, par_id_responsible: number, dty_id: number, doc_title: string, doc_description: string,
                      doc_status: string, doc_obtainment_date: string, doc_execution_date: string, doc_validity_date: string,
                      /*file: string, */topics: number[], dossiers: number[]) {
    return this.pg.pgcall('documents/document_update', {
      prm_doc_id: doc_id,
      prm_par_id_responsible: par_id_responsible,
      prm_dty_id: dty_id,
      prm_title: doc_title,
      prm_description: doc_description,
      prm_status: doc_status,
      prm_obtainment_date: doc_obtainment_date,
      prm_execution_date: doc_execution_date,
      prm_validity_date: doc_validity_date,
      prm_file: null,
      prm_topics: topics,
      prm_dossiers: dossiers
    });
  }

  public deleteDocument(doc_id: number) {
    return this.pg.pgcall('documents/document_delete', {
      prm_doc_id: doc_id
    });
  }

}
