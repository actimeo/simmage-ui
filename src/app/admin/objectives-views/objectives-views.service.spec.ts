/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ObjectivesViewsService } from './objectives-views.service';
import { Observable } from 'rxjs/Observable';
import { PgService } from '../../services/backend/pg.service';
import { UserService } from '../../services/utils/user.service';

class FakeUserService {
  public userData: any = { token: 123456789 };
}

describe('Service: ObjectivesViews', () => {

  const fakePgService = jasmine.createSpyObj('PgService', ['pgcall']);
  const fakeUserService = new FakeUserService();
  const userToken = 123456789;
  const data = [
    {
      id: 1,
      name: 'a name'
    },
    {
      id: 3,
      name: 'another name'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ObjectivesViewsService,
        { provide: UserService, useValue: fakeUserService },
        { provide: PgService, useValue: fakePgService }
      ]
    });
  });

  it('should return an Observable of type objectives-views', inject([ObjectivesViewsService], (service: ObjectivesViewsService) => {
    const objectivesViews = {
      id: 1,
      name: 'a name'
    };

    const objectivesViewsId = 1;

    fakePgService.pgcall.and.returnValue(Observable.of(objectivesViews));

    service.getObjectivesViews(objectivesViewsId).subscribe(obj => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('objectives/objectivesview_get', {
        prm_id: 1
      });
    });
  }));

  it('should return a number which is the id of the new objectives-views',
    inject([ObjectivesViewsService], (service: ObjectivesViewsService) => {
      const objectivesViewsName = 'a name';
      // TODO : declare all other fields of objectivesViews object

      fakePgService.pgcall.and.returnValue(Observable.of(1));

      service.addObjectivesViews(objectivesViewsName, []).subscribe(obs => {
        expect(fakePgService.pgcall).toHaveBeenCalledWith('objectives/objectivesview_add', {
          prm_name: 'a name',
          prm_top_ids: []
        });
      });
    }));

  it('should return a boolean when we update objectives-views object',
    inject([ObjectivesViewsService], (service: ObjectivesViewsService) => {
      fakePgService.pgcall.and.returnValue(Observable.of(true));

      const objectivesViewsId = 1;
      const objectivesViewsName = 'a name';
      // TODO : declare all other fields of objectivesViews object

      service.updateObjectivesViews(objectivesViewsId, objectivesViewsName, []).subscribe(obs => {
        expect(fakePgService.pgcall).toHaveBeenCalledWith('objectives/objectivesview_update', {
          prm_id: 1,
          prm_name: 'a name',
          prm_top_ids: []
        });
      });
    }));

  it('should return a boolean when deleting objectives-views object',
    inject([ObjectivesViewsService], (service: ObjectivesViewsService) => {
      fakePgService.pgcall.and.returnValue(Observable.of(true));

      const objectivesViewsId = 1;

      service.deleteObjectivesViews(objectivesViewsId).subscribe(obs => {
        expect(fakePgService.pgcall).toHaveBeenCalledWith('objectives/objectivesview_delete', {
          prm_id: 1
        });
      });
    }));

  it('should return a list of 2 objectives-views objects by default',
    inject([ObjectivesViewsService], (service: ObjectivesViewsService) => {
      fakePgService.pgcall.and.returnValue(Observable.of(data));

      service.loadObjectivesViews().subscribe(obs => {
        expect(fakePgService.pgcall).toHaveBeenCalledWith('objectives/objectivesview_list', {
        });
      });
    }));
});
