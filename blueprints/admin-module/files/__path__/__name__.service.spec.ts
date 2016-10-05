/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { <%= classifiedModuleName %>Service } from './<%= dasherizedModuleName %>.service';
import { Observable } from 'rxjs/Observable';
import { PgService } from '../../pg.service';
import { UserService } from '../../shared/user.service';

class FakeUserService {
  public userData: any = { token: 123456789 };
}

describe('Service: <%= classifiedModuleName %>', () => {

  const fakePgService = jasmine.createSpyObj('PgService', ['pgcall']);
  const fakeUserService = new FakeUserService();
  const userToken = 123456789;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        <%= classifiedModuleName %>Service,
        { provide: UserService, useValue: fakeUserService },
        { provide: PgService, useValue: fakePgService }
      ]
    });
  });

  it('should return an Observable of type <%= dasherizedModuleName %>', inject([<%= classifiedModuleName %>Service], (service: <%= classifiedModuleName %>Service) => {
    const <%= camelizedModuleName %> = {
      // Todo : fill content of mock <%= classifiedModuleName %> object with an id of 1
      id: 1,
      name: 'a name'
    };

    const <%= camelizedModuleName %>Id = 1;

    //fakePgService.pgcall.and.returnValue(Observable.of(<%= camelizedModuleName %>));

    service.get<%= classifiedModuleName %>(<%= camelizedModuleName %>Id).subscribe(obj => {
      expect(obj).toEqual(<%= camelizedModuleName %>);
    });
  }));

  it('should return a number which is the id of the new <%= dasherizedModuleName %>', inject([<%= classifiedModuleName %>Service], (service: <%= classifiedModuleName %>Service) => {
     const <%= camelizedModuleName %>Name = '<%= classifiedModuleName %>';
     // TODO : declare all other fields of <%= camelizedModuleName %> object

     service.add<%= classifiedModuleName %>(<%= camelizedModuleName %>Name /* TODO : fill with other necessary arguments */).subscribe(obs => {
       expect(obs).toBe(2);
     });
   }));

   it('should return a boolean when we update <%= dasherizedModuleName %> object', inject([<%= classifiedModuleName %>Service], (service: <%= classifiedModuleName %>Service) => {
     //fakePgService.pgcall.and.returnValue(Observable.of(true));

     const <%= camelizedModuleName %>Id = 1;
     const <%= camelizedModuleName %>Name = '<%= classifiedModuleName %>';
     // TODO : declare all other fields of <%= camelizedModuleName %> object

     service.update<%= classifiedModuleName %>(<%= camelizedModuleName %>Id, <%= camelizedModuleName %>Name /* TODO : fill with other necessary arguments */).subscribe(obs => {
       expect(obs).toBe(true);
     });
   }));

   it('should return a boolean when deleting <%= dasherizedModuleName %> object', inject([<%= classifiedModuleName %>Service], (service: <%= classifiedModuleName %>Service) => {
     //fakePgService.pgcall.and.returnValue(Observable.of(true));

     const <%= camelizedModuleName %>Id = 1;

     service.delete<%= classifiedModuleName %>(<%= camelizedModuleName %>Id).subscribe(obs => {
       expect(obs).toBe(true);
     });
   }));

   it('should return a list of 2 <%= dasherizedModuleName %> objects by default', inject([<%= classifiedModuleName %>Service], (service: <%= classifiedModuleName %>Service) => {
     //fakePgService.pgcall.and.returnValue(Observable.of(true));

     service.load<%= classifiedModuleName %>().subscribe(obs => {
       expect(obs.length).toBe(2);
     });
   }));
});
