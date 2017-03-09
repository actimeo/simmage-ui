/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GroupService } from './group.service';
import { Observable } from 'rxjs/Observable';
import { PgService } from '../../services/backend/pg.service';
import { UserService } from '../../services/utils/user.service';

class FakeUserService {
  public userData: any = { token: 123456789 };
}

describe('Service: Group', () => {

  const fakePgService = jasmine.createSpyObj('PgService', ['pgcall']);
  const fakeUserService = new FakeUserService();
  const userToken = 123456789;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          GroupService,
          { provide: UserService, useValue: fakeUserService },
          { provide: PgService, useValue: fakePgService }
        ]
    });
  });

  it('should ...', inject([GroupService], (service: GroupService) => {
    expect(service).toBeTruthy();
  }));

  it('should return an observable of a group', inject([GroupService], (service: GroupService) => {
    const group = {
      group: {
        grp_id: 1,
        grp_name: 'Group',
        grp_description: 'Description',
        grp_mandatory: true,
        grp_orientation: 'organization',
        prg_org_id: 1
      },
      topics: []
    };

    const groupId = 1;

    fakePgService.pgcall.and.returnValue(Observable.of(group));

    service.loadGroup(groupId).subscribe(() => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('organ/group_get', { prm_id: groupId });
      expect(fakePgService.pgcall).toHaveBeenCalledWith('organ/group_get_topics', { prm_id: groupId });
    });
  }));

  it('should return a list of groups', inject([GroupService], (service: GroupService) => {
    const groupData = [
      {
        group: {
          grp_id: 1,
          grp_name: 'Group',
          grp_description: 'Description',
          grp_mandatory: true,
          grp_orientation: 'organization',
          prg_org_id: 1
        },
        topics: []
      },
      {
        group: {
          grp_id: 2,
          grp_name: 'Group 2',
          grp_description: 'Description 2',
          grp_mandatory: true,
          grp_orientation: 'organization',
          prg_org_id: 1
        },
        topics: []
      }
    ];

    fakePgService.pgcall.and.returnValue(Observable.of(groupData));

    service.loadGroups().subscribe(() => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('organ/group_list', {
        prm_org_id: null,
        prm_internal: null
      });
    });
  }));

  it('should return a boolean when we update a group', inject([GroupService], (service: GroupService) => {
    fakePgService.pgcall.and.returnValue(Observable.of(true));

    const groupId = 1;
    const groupName = 'Group';
    const groupDescription = 'Description';
    const groupOrientation = 'organization';
    const groupOrganId = 1;

    service.updateGroup(groupId, groupName, groupDescription, true, groupOrientation, groupOrganId).subscribe(() => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('organ/group_update', {
        prm_id: groupId,
        prm_name: groupName,
        prm_description: groupDescription,
        prm_mandatory: true,
        prm_orientation: groupOrientation,
        prm_org_id: groupOrganId
      });
    });
  }));

  it('should return a number which is the id of the new group', inject([GroupService], (service: GroupService) => {
    fakePgService.pgcall.and.returnValue(Observable.of(1));

    const groupName = 'Group';
    const groupDescription = 'Description';
    const groupOrientation = 'organization';
    const groupOrganId = 1;

    service.addGroup(groupName, groupDescription, true, groupOrientation, groupOrganId).subscribe(() => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('organ/group_add', {
        prm_name: groupName,
        prm_description: groupDescription,
        prm_mandatory: true,
        prm_orientation: groupOrientation,
        prm_org_id: groupOrganId
      });
    });
  }));

  it('should return a boolean when deleting a group', inject([GroupService], (service: GroupService) => {
    fakePgService.pgcall.and.returnValue(Observable.of(true));

    const groupId = 1;

    service.deleteGroup(groupId).subscribe(() => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('organ/group_delete', {
        prm_id: groupId
      });
    });
  }));

  it('should provide a list of organizations', inject([GroupService], (service: GroupService) => {
    const organs = [
      {
        org_id: 1,
        org_name: 'Organization',
        org_description: 'Description'
      },
      {
        org_id: 2,
        org_name: 'Organization 2',
        org_description: 'Description 2'
      }
    ];

    fakePgService.pgcall.and.returnValue(Observable.of(organs));

    service.loadOrganizations().subscribe(() => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('organ/organization_list', { prm_internal: null });
    });
  }));

  it('should provide a list of topics', inject([GroupService], (service: GroupService) => {
    const topics = [
      {
        top_id: 1,
        top_name: 'Topic'
      },
      {
        top_id: 2,
        top_name: 'Topic 2'
      }
    ];

    fakePgService.pgcall.and.returnValue(Observable.of(topics));

    service.loadTopics().subscribe(() => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('organ/topics_list', { });
    });
  }));

  it('should return a boolean when updating a group topics', inject([GroupService], (service: GroupService) => {
    fakePgService.pgcall.and.returnValue(Observable.of(true));

    const groupId = 1;
    const topics = [1, 3, 4];

    service.setTopics(groupId, topics).subscribe(() => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('organ/group_set_topics', {
        prm_id: groupId,
        prm_topics: topics
      })
    });
  }));
});
