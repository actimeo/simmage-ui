import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { UserService } from '../../services/utils/user.service';
import { PgService } from '../../services/backend/pg.service';
import { OrganService } from '../../services/backend/organ.service';

import { DbPortal } from '../../services/backend/db-models/portal';
import { DbGroupList, DbTopic } from '../../services/backend/db-models/organ';

import { UsergroupJson } from '../../services/backend/db-models/json';

@Injectable()
export class UsergroupsService {


  constructor(private user: UserService, private pg: PgService, private organ: OrganService) {
  }

  /**
   * Load the list of usergroups
   * including related portals and groups for each usergroup
   */
  public loadUsergroups(ugr_id: number): Observable<UsergroupJson[]> {
    const req = {
      ugr_id: true,
      ugr_name: true,
      ugr_rights: true,
      ugr_statuses: true,
      groups_dossiers: {
        grp_id: true,
        grp_name: true
      },
      portals: {
        por_id: true,
        por_name: true
      },
      topics: {
        top_id: true,
        top_name: true,
        top_icon: true,
        ugt_rights: true,
      },
      groups_participants: {
        grp_id: true,
        grp_name: true
      }
    };
    return this.pg.pgcall(
      'login/usergroup_json', {
        prm_ugr_id: ugr_id, req: JSON.stringify(req)
      });
  }

  // functions for a specific usergroup

  public loadPortals(): Observable<DbPortal[]> {
    return this.pg.pgcall('portal/portal_list', {
    });
  }

  public loadGroups(): Observable<DbGroupList[]> {
    return this.pg.pgcall('organ/group_list', {
      prm_org_id: null,
      prm_internal: true
    });
  }

  loadTopics(): Observable<DbTopic[]> {
    return this.pg.pgcall('organ/topics_list', {
    });
  }

  public addUsergroup(name: string, rights: string[], dossiers: string[]): Observable<number> {
    return this.pg.pgcall('login/usergroup_add', {
      prm_name: name,
      prm_ugr_rights: rights,
      prm_statuses: dossiers
    });
  }

  public updateUsergroup(
    id: number,
    name: string,
    groupsDossiers: number[],
    portals: number[],
    groupsParticipants: number[],
    topics: any[],
    rights: string[],
    statuses: string[],
    newUsergroup: boolean) {

    const batch = [
      {
        proc: 'login/usergroup_set_group_dossiers',
        args: {
          prm_ugr_id: id,
          prm_grp_ids: groupsDossiers
        }
      },
      {
        proc: 'login/usergroup_set_portals',
        args: {
          prm_ugr_id: id,
          prm_por_ids: portals
        }
      },
      {
        proc: 'login/usergroup_set_group_participants',
        args: {
          prm_ugr_id: id,
          prm_grp_ids: groupsParticipants
        }
      }
    ];

    if (!newUsergroup) {
      batch.unshift(
      {
        proc: 'login/usergroup_update',
        args: {
          prm_ugr_id: id,
          prm_name: name,
          prm_ugr_rights: rights,
          prm_statuses: statuses
        } as any
      });
    }

    if (topics) {
      batch.push({
        proc: 'login/usergroup_set_topics',
        args: {
          prm_ugr_id: id,
          prm_top_ids: topics.map(t => t.id)
        } as any
      });

      topics.forEach(t => {
        batch.push({
          proc: 'login/usergroup_topic_set_rights',
          args: {
            prm_ugr_id: id,
            prm_top_id: t.id,
            prm_ugt_rights: t.rights
          } as any
        });
      });
    }

    return this.pg.pgbatch(batch);
  }

  public deleteUsergroup(id: number) {
    return this.pg.pgcall('login/usergroup_delete', {
      prm_ugr_id: id
    });
  }
}
