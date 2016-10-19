/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EventsViewsService } from './events-views.service';
import { Observable } from 'rxjs/Observable';
import { PgService } from '../../pg.service';
import { UserService } from '../../user.service';

class FakeUserService {
  public userData: any = { token: 123456789 };
}

describe('Service: EventsViews', () => {

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
        EventsViewsService,
        { provide: UserService, useValue: fakeUserService },
        { provide: PgService, useValue: fakePgService }
      ]
    });
  });

  it('should return an Observable of type events-views', inject([EventsViewsService], (service: EventsViewsService) => {
    const eventsViews = {
      id: 1,
      name: 'a name'
    };

    const eventsViewsId = 1;

    fakePgService.pgcall.and.returnValue(Observable.of(eventsViews));

    service.getEventsViews(eventsViewsId).subscribe(obj => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('events/eventsview_get', {
        prm_token: userToken,
        prm_id: 1
      });
    });
  }));

  it('should return a number which is the id of the new events-views', inject([EventsViewsService], (service: EventsViewsService) => {
     const eventsViewsName = 'a name';
     // TODO : declare all other fields of eventsViews object

     fakePgService.pgcall.and.returnValue(Observable.of(1));

     service.addEventsViews(eventsViewsName, [], 3, []).subscribe(obs => {
       expect(fakePgService.pgcall).toHaveBeenCalledWith('events/eventsview_add', {
        prm_token: userToken,
        prm_name: 'a name',
        prm_categories: [],
        prm_ety_id: 3,
        prm_top_ids: []
      });
     });
   }));

   it('should return a boolean when we update events-views object', inject([EventsViewsService], (service: EventsViewsService) => {
     fakePgService.pgcall.and.returnValue(Observable.of(true));

     const eventsViewsId = 1;
     const eventsViewsName = 'a name';
     // TODO : declare all other fields of eventsViews object

     service.updateEventsViews(eventsViewsId, eventsViewsName, [], 3, []).subscribe(obs => {
       expect(fakePgService.pgcall).toHaveBeenCalledWith('events/eventsview_update', {
        prm_token: userToken,
        prm_id: 1,
        prm_name: 'a name',
        prm_categories: [],
        prm_ety_id: 3,
        prm_top_ids: []
      });
     });
   }));

   it('should return a boolean when deleting events-views object', inject([EventsViewsService], (service: EventsViewsService) => {
     fakePgService.pgcall.and.returnValue(Observable.of(true));

     const eventsViewsId = 1;

     service.deleteEventsViews(eventsViewsId).subscribe(obs => {
       expect(fakePgService.pgcall).toHaveBeenCalledWith('events/eventsview_delete', {
        prm_token: userToken,
        prm_id: 1
      });
     });
   }));

   it('should return a list of 2 events-views objects by default', inject([EventsViewsService], (service: EventsViewsService) => {
     fakePgService.pgcall.and.returnValue(Observable.of(data));

     service.loadEventsViews().subscribe(obs => {
       expect(fakePgService.pgcall).toHaveBeenCalledWith('events/eventsview_list', {
        prm_token: userToken
      });
     });
   }));
});
