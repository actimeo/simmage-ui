/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ListsViewsService } from './lists-views.service';
import { Observable } from 'rxjs/Observable';
import { PgService } from '../../services/backend/pg.service';
import { UserService } from '../../services/utils/user.service';

class FakeUserService {
  public userData: any = { token: 123456789 };
}

describe('Service: ListsViews', () => {

  const fakePgService = jasmine.createSpyObj('PgService', ['pgcall']);
  const fakeUserService = new FakeUserService();
  const data = [
    {
      liv_id: 1,
      liv_name: 'a name'
    },
    {
      liv_id: 3,
      liv_name: 'another name'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ListsViewsService,
        { provide: UserService, useValue: fakeUserService },
        { provide: PgService, useValue: fakePgService }
      ]
    });
  });

  it('should return an Observable of type lists-views', inject([ListsViewsService], (service: ListsViewsService) => {
    const listsViews = {
      liv_id: 1,
      liv_name: 'a name'
    };

    const listsViewsId = 1;

    fakePgService.pgcall.and.returnValue(Observable.of(listsViews));

    service.getListsViews(listsViewsId).subscribe(obj => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('lists/listsview_get', {
        prm_id: 1
      });
    });
  }));

  it('should return a number which is the id of the new lists-views', inject([ListsViewsService], (service: ListsViewsService) => {
     const listsViewsName = 'a name';

     fakePgService.pgcall.and.returnValue(Observable.of(1));

     service.addListsViews('a name').subscribe(obs => {
       expect(fakePgService.pgcall).toHaveBeenCalledWith('lists/listsview_add', {
        prm_name: 'a name'
      });
     });
   }));

   it('should return a boolean when we update lists-views object', inject([ListsViewsService], (service: ListsViewsService) => {
     fakePgService.pgcall.and.returnValue(Observable.of(true));

     const listsViewsId = 1;

     service.updateListsViews(listsViewsId, 'a name').subscribe(obs => {
       expect(fakePgService.pgcall).toHaveBeenCalledWith('lists/listsview_update', {
        prm_id: 1,
        prm_name: 'a name'
      });
     });
   }));

   it('should return a boolean when deleting lists-views object', inject([ListsViewsService], (service: ListsViewsService) => {
     fakePgService.pgcall.and.returnValue(Observable.of(true));

     const listsViewsId = 1;

     service.deleteListsViews(listsViewsId).subscribe(obs => {
       expect(fakePgService.pgcall).toHaveBeenCalledWith('lists/listsview_delete', {
        prm_id: 1
      });
     });
   }));

   it('should return a list of 2 lists-views objects by default', inject([ListsViewsService], (service: ListsViewsService) => {
     fakePgService.pgcall.and.returnValue(Observable.of(data));

     service.loadListsViews().subscribe(obs => {
       expect(fakePgService.pgcall).toHaveBeenCalledWith('lists/listsview_list', {
      });
     });
   }));
});
