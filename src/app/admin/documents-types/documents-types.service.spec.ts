/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DocumentsTypesService } from './documents-types.service';
import { Observable } from 'rxjs/Observable';
import { PgService } from '../../pg.service';
import { UserService } from '../../user.service';

class FakeUserService {
  public userData: any = { token: 123456789 };
}

// TODO : replace all "schema" occurences by the correct emplacement

describe('Service: DocumentsTypes', () => {

  const fakePgService = jasmine.createSpyObj('PgService', ['pgcall']);
  const fakeUserService = new FakeUserService();
  const userToken = 123456789;
  const data = [
    {
      dty_id: 1,
      dty_name: 'a name'
    },
    {
      dty_id: 3,
      dty_name: 'another name'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DocumentsTypesService,
        { provide: UserService, useValue: fakeUserService },
        { provide: PgService, useValue: fakePgService }
      ]
    });
  });

  it('should return an Observable of type documents-types', inject([DocumentsTypesService], (service: DocumentsTypesService) => {
    const documentsTypes = {
      dty_id: 1,
      dty_name: 'a name'
    };

    const documentsTypesId = 1;

    fakePgService.pgcall.and.returnValue(Observable.of(documentsTypes));

    service.getDocumentsTypes(documentsTypesId).subscribe(obj => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('documents/document_type_get', {
        prm_token: userToken,
        prm_dty_id: 1
      });
    });
  }));

  it('should return a number which is the id of the new documents-types', inject([DocumentsTypesService], (service: DocumentsTypesService) => {
    const documentsTypesName = 'a name';
    // TODO : declare all other fields of documentsTypes object

    fakePgService.pgcall.and.returnValue(Observable.of(1));

    service.addDocumentsTypes(documentsTypesName, false, [], []).subscribe(obs => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('documents/document_type_add_details', {
        prm_token: userToken,
        prm_name: documentsTypesName,
        prm_individual_name: false,
        prm_topics: [],
        prm_organizations: []
      });
    });
  }));

  it('should return a boolean when we update documents-types object', inject([DocumentsTypesService], (service: DocumentsTypesService) => {
    fakePgService.pgcall.and.returnValue(Observable.of(true));

    const documentsTypesId = 1;
    const documentsTypesName = 'DocumentsTypes';
    // TODO : declare all other fields of documentsTypes object

    service.updateDocumentsTypes(documentsTypesId, documentsTypesName,
      false, [], []).subscribe(obs => {
        expect(fakePgService.pgcall).toHaveBeenCalledWith('documents/document_type_update_details', {
          prm_token: userToken,
          prm_dty_id: 1,
          prm_name: documentsTypesName,
          prm_individual_name: false,
          prm_topics: [],
          prm_organizations: []
        });
      });
  }));

  it('should return a boolean when deleting documents-types object', inject([DocumentsTypesService], (service: DocumentsTypesService) => {
    fakePgService.pgcall.and.returnValue(Observable.of(true));

    const documentsTypesId = 1;

    service.deleteDocumentsTypes(documentsTypesId).subscribe(obs => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('documents/document_type_delete', {
        prm_token: userToken,
        prm_dty_id: 1
      });
    });
  }));

  it('should return a list of 2 documents-types objects by default', inject([DocumentsTypesService], (service: DocumentsTypesService) => {
    fakePgService.pgcall.and.returnValue(Observable.of(data));

    service.loadDocumentsTypes().subscribe(obs => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('documents/document_type_list', {
        prm_token: userToken
      });
    });
  }));
});
