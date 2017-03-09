import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../services/utils/user.service';
import { PgService } from '../../services/backend/pg.service';
import { DbDocumentType, DbDocumentTypeList } from '../../db-models/documents';
import { DbTopic, DbOrganization } from '../../db-models/organ';

import { DocumentTypeJson } from '../../db-models/json';

export interface DocumentsTypesDetails {
  documentType: DbDocumentType;
  topics: DbTopic[];
  organizations: DbOrganization[];
}

export interface DocumentsTypesListDetails {
  documentType: DbDocumentTypeList;
  topics: DbTopic[];
  organizations: DbOrganization[];
}

@Injectable()
export class DocumentsTypesService {

  constructor(private user: UserService, private pg: PgService) { }

  loadDocumentsTypesDetails(id: number): Observable<DocumentTypeJson[]> {
    let req = {
      dty_id: true,
      dty_name: true,
      dty_individual_name: true,
      topics: {
        top_id: true,
        top_name: true,
        top_icon: true,
        top_color: true
      },
      organizations: {
        org_id: true,
        org_name: true,
        org_description: true
      }
    };
    return this.pg.pgcall('documents/document_type_json', {
      prm_dty_id: id, req: JSON.stringify(req)
    });
  }

  public getDocumentsTypes(id: number): Observable<DbDocumentType> {
    return this.pg.pgcall('documents/document_type_get', {
      prm_dty_id: id
    });
  }

  public updateDocumentsTypes(id: number, name: string,
    individualName: boolean, topics: number[], organizations: number[]): Observable<boolean> {
    return this.pg.pgcall('documents/document_type_update_details', {
      prm_dty_id: id,
      prm_name: name,
      prm_individual_name: individualName,
      prm_topics: topics,
      prm_organizations: organizations
    });
  }

  public addDocumentsTypes(name: string,
    individualName: boolean, topics: number[], organizations: number[]): Observable<number> {
    return this.pg.pgcall('documents/document_type_add_details', {
      prm_name: name,
      prm_individual_name: individualName,
      prm_topics: topics,
      prm_organizations: organizations
    });
  }

  public deleteDocumentsTypes(id: number) {
    return this.pg.pgcall('documents/document_type_delete', {
      prm_dty_id: id
    });
  }

  public loadDocumentsTypes(): Observable<DocumentsTypesListDetails[]> {
    return this.pg.pgcall('documents/document_type_list', {
      // Encapsulate result in DocumentsTypesListDetails
    }).map(dtys => dtys.map(dty => ({ documentType: dty, topics: [], organizations: [] })));
  }

  private getTopics(id: number): Observable<DbTopic[]> {
    return this.pg.pgcall('documents/document_type_topics_list', {
      prm_dty_id: id
    });
  }

  private getOrganizations(id: number): Observable<DbOrganization[]> {
    return this.pg.pgcall('documents/document_type_organizations_list', {
      prm_dty_id: id
    });
  }
}
