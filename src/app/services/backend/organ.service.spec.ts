/* tslint:disable:no-unused-variable */
import { PgService } from './pg.service';
import { UserService } from './../utils/user.service';
import { OrganService } from './organ.service';

import { TestBed, async, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

class FakeUserService {
  public userData: any = { token: 123456789 };
}

describe('Service: Organ', () => {

  const fakePgService = jasmine.createSpyObj('PgService', ['pgcall']);
  const fakeUserService = new FakeUserService();
  const userToken = 123456789;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrganService,
        { provide: UserService, useValue: fakeUserService },
        { provide: PgService, useValue: fakePgService }
      ]
    });
  });

  it('should ...', inject([OrganService], (service: OrganService) => {
    expect(service).toBeTruthy();
  }));

  it('should return an Observable of an organization', inject([OrganService], (service: OrganService) => {
    const organ = {
      org_id: 1,
      org_name: 'Organization',
      org_description: 'Description',
      org_internal: true
    };

    const organId = 1;

    fakePgService.pgcall.and.returnValue(Observable.of(organ));

    service.loadOrgan(organId).subscribe(() => {
      expect(fakePgService.pgcall)
      .toHaveBeenCalledWith('organ/organization_get', {
        prm_id: organId
      });
    });
   }));

   it('should return a boolean when we update an organization', inject([OrganService], (service: OrganService) => {
     fakePgService.pgcall.and.returnValue(Observable.of(true));

     const organId = 1;
     const organName = 'Organization';
     const organDescription = 'Description';

     service.updateOrgan(organId, organName, organDescription, true).subscribe(() => {
       expect(fakePgService.pgcall).toHaveBeenCalledWith('organ/organization_set', {
         prm_id: organId,
         prm_name: organName,
         prm_description: organDescription,
         prm_internal: true
       });
     });
   }));

   it('should return a number which is the id of the new organization', inject([OrganService], (service: OrganService) => {
     fakePgService.pgcall.and.returnValue(Observable.of(1));

     const organName = 'Organization';
     const organDescription = 'Description';

     service.addOrgan(organName, organDescription, false).subscribe(() => {
       expect(fakePgService.pgcall).toHaveBeenCalledWith('organ/organization_add', {
         prm_name: organName,
         prm_description: organDescription,
         prm_internal: false
       });
     });
   }));

   it('should return a boolean when deleting an organization', inject([OrganService], (service: OrganService) => {
     fakePgService.pgcall.and.returnValue(Observable.of(true));

     const organId = 1;

     service.deleteOrgan(organId).subscribe(() => {
       expect(fakePgService.pgcall).toHaveBeenCalledWith('organ/organization_delete', {
          prm_id: organId
       });
     });
   }));
});
