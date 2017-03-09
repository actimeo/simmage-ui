/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotesViewsService } from './notes-views.service';
import { Observable } from 'rxjs/Observable';
import { PgService } from '../../services/backend/pg.service';
import { UserService } from '../../services/utils/user.service';

class FakeUserService {
  public userData: any = { token: 123456789 };
}

describe('Service: NotesViews', () => {

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
        NotesViewsService,
        { provide: UserService, useValue: fakeUserService },
        { provide: PgService, useValue: fakePgService }
      ]
    });
  });

  it('should return an Observable of type notes-views', inject([NotesViewsService], (service: NotesViewsService) => {
    const notesViews = {
      id: 1,
      name: 'a name'
    };

    const notesViewsId = 1;

    fakePgService.pgcall.and.returnValue(Observable.of(notesViews));

    service.getNotesViews(notesViewsId).subscribe(obj => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('notes/notesview_get', {
        prm_id: 1
      });
    });
  }));

  it('should return a number which is the id of the new notes-views', inject([NotesViewsService], (service: NotesViewsService) => {
     const notesViewsName = 'a name';
     // TODO : declare all other fields of notesViews object

     fakePgService.pgcall.and.returnValue(Observable.of(1));

     service.addNotesViews(notesViewsName, []).subscribe(obs => {
       expect(fakePgService.pgcall).toHaveBeenCalledWith('notes/notesview_add', {
        prm_name: 'a name',
        prm_top_ids: []
      });
     });
   }));

   it('should return a boolean when we update notes-views object', inject([NotesViewsService], (service: NotesViewsService) => {
     fakePgService.pgcall.and.returnValue(Observable.of(true));

     const notesViewsId = 1;
     const notesViewsName = 'a name';
     // TODO : declare all other fields of notesViews object

     service.updateNotesViews(notesViewsId, notesViewsName, []).subscribe(obs => {
       expect(fakePgService.pgcall).toHaveBeenCalledWith('notes/notesview_update', {
        prm_id: 1,
        prm_name: 'a name',
        prm_top_ids: []
      });
     });
   }));

   it('should return a boolean when deleting notes-views object', inject([NotesViewsService], (service: NotesViewsService) => {
     fakePgService.pgcall.and.returnValue(Observable.of(true));

     const notesViewsId = 1;

     service.deleteNotesViews(notesViewsId).subscribe(obs => {
       expect(fakePgService.pgcall).toHaveBeenCalledWith('notes/notesview_delete', {
        prm_id: 1
      });
     });
   }));

   it('should return a list of 2 notes-views objects by default', inject([NotesViewsService], (service: NotesViewsService) => {
     fakePgService.pgcall.and.returnValue(Observable.of(data));

     service.loadNotesViews().subscribe(obs => {
       expect(fakePgService.pgcall).toHaveBeenCalledWith('notes/notesview_list', {
      });
     });
   }));
});
