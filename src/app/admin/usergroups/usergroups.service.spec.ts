/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UsergroupsService } from './usergroups.service';
import { Observable } from 'rxjs/Observable';
import { PgService } from '../../pg.service';
import { UserService } from '../../user.service';
import { OrganService } from '../../shared/organ.service';

class FakeUserService {
  public userData: any = { token: 123456789 };
}

describe('Service: Usergroups', () => {

  const fakePgService = jasmine.createSpyObj('PgService', ['pgcall']);
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
        groups: [],
        portals: [],
        topics: []
      },
      {
        ugr_id: 2,
        ugr_name: 'usergroup 2',
        ugr_rights: [],
        ugr_statuses: [],
        groups: [],
        portals: [],
        topics: []
      }
    ];

    let req = {
      ugr_id: true,
      ugr_name: true,
      ugr_rights: true,
      ugr_statuses: true,
      groups: {
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
      groups: [],
      portals: [],
      topics: []
    };

    let req = {
      ugr_id: true,
      ugr_name: true,
      ugr_rights: true,
      ugr_statuses: true,
      groups: {
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

  it('should return null when adding an usergroup atm', inject([UsergroupsService], (service: UsergroupsService) => {
    // TODO : update test accordingly when addUsergroup function will be fixed
    service.addUsergroup(null, null, null, null, null, null).subscribe(resp => {
      expect(resp).toBeNull();
    });
  }));

  it('should return null when updating an usergroup atm', inject([UsergroupsService], (service: UsergroupsService) => {
    // TODO : update test accordingly when updateUsergroup function will be fixed
    service.updateUsergroup(null, null, null, null, null, null, null).subscribe(resp => {
      expect(resp).toBeNull();
    });
  }));

  it('should return a boolean when setting groups to an usergroup', inject([UsergroupsService], (service: UsergroupsService) => {
    const ugrId = 1;

    fakePgService.pgcall.and.returnValue(Observable.of(true));

    service.setGroups(ugrId, []).subscribe(() => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('login/usergroup_set_groups', {
        prm_ugr_id: ugrId,
        prm_grp_ids: []
      });
    });
  }));

  it('should return a boolean when setting portals to an usergroup', inject([UsergroupsService], (service: UsergroupsService) => {
    const ugrId = 1;

    fakePgService.pgcall.and.returnValue(Observable.of(true));

    service.setPortals(ugrId, []).subscribe(() => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('login/usergroup_set_portals', {
        prm_ugr_id: ugrId,
        prm_por_ids: []
      });
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
