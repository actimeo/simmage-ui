/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DocumentsViewsService } from './documents-views.service';
import { Observable } from 'rxjs/Observable';
import { PgService } from '../../pg.service';
import { UserService } from '../../user.service';

class FakeUserService {
  public userData: any = { token: 123456789 };
}

describe('Service: DocumentsViews', () => {

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
        DocumentsViewsService,
        { provide: UserService, useValue: fakeUserService },
        { provide: PgService, useValue: fakePgService }
      ]
    });
  });

  it('should return an Observable of type documents-views', inject([DocumentsViewsService], (service: DocumentsViewsService) => {
    const documentsViews = {
      id: 1,
      name: 'a name'
    };

    const documentsViewsId = 1;

    fakePgService.pgcall.and.returnValue(Observable.of(documentsViews));

    service.getDocumentsViews(documentsViewsId).subscribe(obj => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('documents/documentsview_get', {
        prm_id: 1
      });
    });
  }));

  it('should return a number which is the id of the new documents-views',
    inject([DocumentsViewsService], (service: DocumentsViewsService) => {
      const documentsViewsName = 'a name';
      // TODO : declare all other fields of documentsViews object

      fakePgService.pgcall.and.returnValue(Observable.of(1));

      service.addDocumentsViews(documentsViewsName, 3, []).subscribe(obs => {
        expect(fakePgService.pgcall).toHaveBeenCalledWith('documents/documentsview_add', {
          prm_name: 'a name',
          prm_dty_id: 3,
          prm_top_ids: []
        });
      });
    }));

  it('should return a boolean when we update documents-views object', inject([DocumentsViewsService], (service: DocumentsViewsService) => {
    fakePgService.pgcall.and.returnValue(Observable.of(true));

    const documentsViewsId = 1;
    const documentsViewsName = 'a name';
    // TODO : declare all other fields of documentsViews object

    service.updateDocumentsViews(documentsViewsId, documentsViewsName, 3, []).subscribe(obs => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('documents/documentsview_update', {
        prm_id: 1,
        prm_name: 'a name',
        prm_dty_id: 3,
        prm_top_ids: []
      });
    });
  }));

  it('should return a boolean when deleting documents-views object', inject([DocumentsViewsService], (service: DocumentsViewsService) => {
    fakePgService.pgcall.and.returnValue(Observable.of(true));

    const documentsViewsId = 1;

    service.deleteDocumentsViews(documentsViewsId).subscribe(obs => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('documents/documentsview_delete', {
        prm_id: 1
      });
    });
  }));

  it('should return a list of 2 documents-views objects by default', inject([DocumentsViewsService], (service: DocumentsViewsService) => {
    fakePgService.pgcall.and.returnValue(Observable.of(data));

    service.loadDocumentsViews().subscribe(obs => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('documents/documentsview_list', {
      });
    });
  }));
});
