/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UsergroupsService } from './usergroups.service';
import { Observable } from 'rxjs/Observable';
import { PgService } from '../../services/backend/pg.service';
import { UserService } from '../../services/utils/user.service';
import { OrganService } from '../../services/backend/organ.service';

class FakeUserService {
  public userData: any = { token: 123456789 };
}

describe('Service: Usergroups', () => {

  const fakePgService = jasmine.createSpyObj('PgService', ['pgcall', 'pgbatch']);
  const fakeUserService = new FakeUserService();
  const fakeOrganService = { };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsergroupsService,
        { provide: PgService, useValue: fakePgService },
        { provide: UserService, useValue: fakeUserService },
        { provide: OrganService, useValue: fakeOrganService }
      ]
    });
  });

  it('should ...', inject([UsergroupsService], (service: UsergroupsService) => {
    expect(service).toBeTruthy();
  }));

  it('should return a list of usergroups on json format', inject([UsergroupsService], (service: UsergroupsService) => {
    const usergroups = [
      {
        ugr_id: 1,
        ugr_name: 'usergroup 1',
        ugr_rights: [],
        ugr_statuses: [],
        dossiers: [],
        portals: [],
        topics: []
      },
      {
        ugr_id: 2,
        ugr_name: 'usergroup 2',
        ugr_rights: [],
        ugr_statuses: [],
        dossiers: [],
        portals: [],
        topics: []
      }
    ];

    let req = {
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

    fakePgService.pgcall.and.returnValue(Observable.of(usergroups));

    service.loadUsergroups(null).subscribe(() => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('login/usergroup_json', {
        prm_ugr_id: null,
        req: JSON.stringify(req)
      })
    });
  }));

  it('should return an usergroup formated as json', inject([UsergroupsService], (service: UsergroupsService) => {
    const usergroups = {
      ugr_id: 1,
      ugr_name: 'usergroup 1',
      ugr_rights: [],
      ugr_statuses: [],
      dossiers: [],
      portals: [],
      topics: []
    };

    let req = {
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

    const ugrId = 1;
    
    fakePgService.pgcall.and.returnValue(Observable.of(usergroups));

    service.loadUsergroups(ugrId).subscribe(ugr => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('login/usergroup_json', {
        prm_ugr_id: ugrId,
        req: JSON.stringify(req)
      });
    });
  }));

  it('should provide a list of portals', inject([UsergroupsService], (service: UsergroupsService) => {
    const portals = [
      {
        por_id: 1,
        por_name: 'portal 1'
      },
      {
        por_id: 2,
        por_name: 'portal 2'
      }
    ];

    fakePgService.pgcall.and.returnValue(Observable.of(portals));

    service.loadPortals().subscribe(() => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('portal/portal_list', { });
    });
  }));

  it('should provide a list of groups', inject([UsergroupsService], (service: UsergroupsService) => {
    const groups = [
      {
        grp_id: 1,
        grp_name: 'group 1',
        grp_org_id: 1,
        grp_internal: true
      },
      {
        grp_id: 2,
        grp_name: 'group 2',
        grp_org_id: 2,
        grp_internal: true
      }
    ];

    fakePgService.pgcall.and.returnValue(Observable.of(groups));

    service.loadGroups().subscribe(() => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('organ/group_list', {
        prm_org_id: null,
        prm_internal: true
      });
    });
  }));

  it('should provide a list of topics', inject([UsergroupsService], (service: UsergroupsService) => {
    const topics = [
      {
        top_id: 1,
        top_name: 'topic 1'
      },
      {
        top_id: 2,
        top_name: 'topic 2'
      }
    ];

    fakePgService.pgcall.and.returnValue(Observable.of(topics));

    service.loadTopics().subscribe(() => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('organ/topics_list', { });
    });
  }));

  it('should return an id when adding a new usergroup', inject([UsergroupsService], (service: UsergroupsService) => {
    const name = 'usergroup';
    const rights = ['a right'];
    const statuses = ['dossiers'];

    fakePgService.pgcall.and.returnValue(Observable.of(1));

    service.addUsergroup(name, rights, statuses).subscribe(() => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('login/usergroup_add', {
        prm_name: name,
        prm_ugr_rights: rights,
        prm_statuses: statuses
      });
    });
  }));

  it('should return a boolean when updating an new usergroup', inject([UsergroupsService], (service: UsergroupsService) => {
    const id = 1;
    const name = 'usergroup';
    const rights = ['a right'];
    const statuses = ['dossiers'];
    const dossiers = [1, 2];
    const participants = [1, 2];
    const portals = [3, 4];
    const topics = [
      {
        id: 1,
        rights: 'right'
      },
      {
        id: 2,
        rights: 'another right'
      }
    ];

    fakePgService.pgbatch.and.returnValue(Observable.of(true));

    service.updateUsergroup(id, name, dossiers, portals, participants, topics, rights, statuses, true).subscribe(resp => {
      expect(fakePgService.pgbatch).toHaveBeenCalledWith([
        {
          proc: 'login/usergroup_set_group_dossiers',
          args: {
            prm_ugr_id: id,
            prm_grp_ids: dossiers
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
            prm_grp_ids: participants
          }
        },
        {
          proc: 'login/usergroup_set_topics',
          args: {
            prm_ugr_id: id,
            prm_top_ids: topics.map(t => t.id)
          } as any
        },
        {
          proc: 'login/usergroup_topic_set_rights',
          args: {
            prm_ugr_id: id,
            prm_top_id: topics[0].id,
            prm_ugt_rights: topics[0].rights
          } as any
        },
        {
          proc: 'login/usergroup_topic_set_rights',
          args: {
            prm_ugr_id: id,
            prm_top_id: topics[1].id,
            prm_ugt_rights: topics[1].rights
          } as any
        }
      ]);
    });
  }));

  it('should return a boolean when updating an existing usergroup', inject([UsergroupsService], (service: UsergroupsService) => {
    const id = 1;
    const name = 'usergroup';
    const rights = ['a right'];
    const statuses = ['dossiers'];
    const dossiers = [1, 2];
    const participants = [1, 2];
    const portals = [3, 4];
    const topics = [
      {
        id: 1,
        rights: 'right'
      },
      {
        id: 2,
        rights: 'another right'
      }
    ];

    fakePgService.pgbatch.and.returnValue(Observable.of(true));

    service.updateUsergroup(id, name, dossiers, portals, participants, topics, rights, statuses, false).subscribe(resp => {
      expect(fakePgService.pgbatch).toHaveBeenCalledWith([
        {
          proc: 'login/usergroup_update',
          args: {
            prm_ugr_id: id,
            prm_name: name,
            prm_ugr_rights: rights,
            prm_statuses: statuses
          } as any
        },
        {
          proc: 'login/usergroup_set_group_dossiers',
          args: {
            prm_ugr_id: id,
            prm_grp_ids: dossiers
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
            prm_grp_ids: participants
          }
        },
        {
          proc: 'login/usergroup_set_topics',
          args: {
            prm_ugr_id: id,
            prm_top_ids: topics.map(t => t.id)
          } as any
        },
        {
          proc: 'login/usergroup_topic_set_rights',
          args: {
            prm_ugr_id: id,
            prm_top_id: topics[0].id,
            prm_ugt_rights: topics[0].rights
          } as any
        },
        {
          proc: 'login/usergroup_topic_set_rights',
          args: {
            prm_ugr_id: id,
            prm_top_id: topics[1].id,
            prm_ugt_rights: topics[1].rights
          } as any
        }
      ]);
    });
  }));

  it('should return a boolean when deleting an usergroup', inject([UsergroupsService], (service: UsergroupsService) => {
    const ugrId = 1;

    fakePgService.pgcall.and.returnValue(Observable.of(true));

    service.deleteUsergroup(ugrId).subscribe(() => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('login/usergroup_delete', { prm_ugr_id: ugrId });
    });
  }));
});
