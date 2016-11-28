/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ResourcesViewsService } from './resources-views.service';
import { Observable } from 'rxjs/Observable';
import { PgService } from '../../pg.service';
import { UserService } from '../../user.service';

class FakeUserService {
  public userData: any = { token: 123456789 };
}

describe('Service: ResourcesViews', () => {

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
        ResourcesViewsService,
        { provide: UserService, useValue: fakeUserService },
        { provide: PgService, useValue: fakePgService }
      ]
    });
  });

  it('should return an Observable of type resources-views', inject([ResourcesViewsService], (service: ResourcesViewsService) => {
    const resourcesViews = {
      id: 1,
      name: 'a name'
    };

    const resourcesViewsId = 1;

    fakePgService.pgcall.and.returnValue(Observable.of(resourcesViews));

    service.getResourcesViews(resourcesViewsId).subscribe(obj => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('resources/resourcesview_get', {
        prm_id: 1
      });
    });
  }));

  it('should return a number which is the id of the new resources-views', inject([ResourcesViewsService], (service: ResourcesViewsService) => {
     const resourcesViewsName = 'a name';
     // TODO : declare all other fields of resourcesViews object

     fakePgService.pgcall.and.returnValue(Observable.of(1));

     service.addResourcesViews(resourcesViewsName, []).subscribe(obs => {
       expect(fakePgService.pgcall).toHaveBeenCalledWith('resources/resourcesview_add', {
        prm_name: 'a name',
        prm_top_ids: []
      });
     });
   }));

   it('should return a boolean when we update resources-views object', inject([ResourcesViewsService], (service: ResourcesViewsService) => {
     fakePgService.pgcall.and.returnValue(Observable.of(true));

     const resourcesViewsId = 1;
     const resourcesViewsName = 'a name';
     // TODO : declare all other fields of resourcesViews object

     service.updateResourcesViews(resourcesViewsId, resourcesViewsName, []).subscribe(obs => {
       expect(fakePgService.pgcall).toHaveBeenCalledWith('resources/resourcesview_update', {
        prm_id: 1,
        prm_name: 'a name',
        prm_top_ids: []
      });
     });
   }));

   it('should return a boolean when deleting resources-views object', inject([ResourcesViewsService], (service: ResourcesViewsService) => {
     fakePgService.pgcall.and.returnValue(Observable.of(true));

     const resourcesViewsId = 1;

     service.deleteResourcesViews(resourcesViewsId).subscribe(obs => {
       expect(fakePgService.pgcall).toHaveBeenCalledWith('resources/resourcesview_delete', {
        prm_id: 1
      });
     });
   }));

   it('should return a list of 2 resources-views objects by default', inject([ResourcesViewsService], (service: ResourcesViewsService) => {
     fakePgService.pgcall.and.returnValue(Observable.of(data));

     service.loadResourcesViews().subscribe(obs => {
       expect(fakePgService.pgcall).toHaveBeenCalledWith('resources/resourcesview_list', {
      });
     });
   }));
});
