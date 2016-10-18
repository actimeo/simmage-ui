import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { DocumentsTypesService, DocumentsTypesListDetails } from './documents-types.service';
import { TopicService } from '../../shared/topic.service';
import { OrganService } from '../../shared/organ.service';
import { DbTopic, DbOrganization } from '../../db-models/organ';

export class DocumentsTypesListData {
  documentsTypes: DocumentsTypesListDetails[];
  topics: DbTopic[];
  organs: DbOrganization[];
}

@Injectable()
export class DocumentsTypesListResolve implements Resolve<DocumentsTypesListData> {

  constructor(
    public service: DocumentsTypesService,
    private topic: TopicService,
    public organ: OrganService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.getData();
  }

  public getData() {
    return Observable.zip(
      this.topic.loadTopics(),
      this.organ.loadOrganizations(true),
      this.service.loadDocumentsTypes(),
      (topics: DbTopic[], organs: DbOrganization[], dtys: DocumentsTypesListDetails[]) => {
        const documentsTypes = dtys.map(dty => {
          dty.topics = dty.documentType.top_ids.map(top_id => {
            return topics.filter((t: DbTopic) => t.top_id === top_id).pop();
          });
          dty.organizations = dty.documentType.org_ids.map(org_id => {
            return organs.filter((o: DbOrganization) => o.org_id === org_id).pop();
          });
          return dty;
        });
        return {
          documentsTypes: documentsTypes,
          topics: topics,
          organs: organs
        };
      });
  }
}
