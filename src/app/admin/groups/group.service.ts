import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { UserService } from '../../services/utils/user.service';
import { PgService } from '../../services/backend/pg.service';
import { DbGroup, DbOrganization, DbTopic } from '../../services/backend/db-models/organ';

@Injectable()
export class GroupService {

  constructor(private user: UserService, private pg: PgService) { }

  loadGroups(): Observable<DbGroup[]> {
    return this.pg.pgcall('organ/group_list', {
      prm_org_id: null,
      prm_internal: null
    });
  }

  addGroup(name: string, description: string, mandatory: boolean, orientation: string, organization: number): Observable<number> {
    return this.pg.pgcall('organ/group_add', {
      prm_name: name,
      prm_description: description,
      prm_mandatory: mandatory,
      prm_orientation: orientation,
      prm_org_id: organization
    });
  }

  updateGroup(id: number, name: string, description: string, mandatory: boolean,
    orientation: string, organization: number): Observable<boolean> {
    return this.pg.pgcall('organ/group_update', {
      prm_id: id,
      prm_name: name,
      prm_description: description,
      prm_mandatory: mandatory,
      prm_orientation: orientation,
      prm_org_id: organization
    });
  }

  deleteGroup(id: number) {
    return this.pg.pgcall('organ/group_delete', {
      prm_id: id
    });
  }

  loadGroup(id: number) {
    return Observable.zip(
      this.getGroup(id),
      this.getTopics(id),

      function (g: DbGroup, ts: DbTopic[]) {
        return { group: g, topics: ts };
      });
  }

  private getGroup(id: number): Observable<DbGroup> {
    return this.pg.pgcall('organ/group_get', {
      prm_id: id
    });
  }

  private getTopics(id: number): Observable<DbTopic[]> {
    return this.pg.pgcall('organ/group_get_topics', {
      prm_id: id
    });
  }

  loadOrganizations(): Observable<DbOrganization[]> {
    return this.pg.pgcall('organ/organization_list', {
      prm_internal: null
    });
  }

  loadTopics(): Observable<DbTopic[]> {
    return this.pg.pgcall('organ/topics_list', {
    });
  }

  setTopics(id: number, topics: number[]): Observable<boolean> {
    return this.pg.pgcall('organ/group_set_topics', {
      prm_id: id,
      prm_topics: topics
    });
  }

}
