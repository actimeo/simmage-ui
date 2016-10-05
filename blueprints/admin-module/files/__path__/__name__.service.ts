import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// import { UserService } from '../../shared/user.service';
// import { PgService } from '../../pg.service';


@Injectable()
export class <%= classifiedModuleName %>Service {

  private data<%= classifiedModuleName %>: any[] = [{
    id: 1,
    name: 'a name'
  },
  {
    id: 2,
    name: 'another name'
  }];

  constructor() { }  

  public get<%= classifiedModuleName %>(id: number): Observable<any> {
    return Observable.of(this.data<%= classifiedModuleName %>[id - 1]);
  }

  public update<%= classifiedModuleName %>(id: number, name: string): Observable<boolean> {
    return Observable.of(true);
  }

  public add<%= classifiedModuleName %>(name: string): Observable<number> {
    return Observable.of(2);
  }

  public delete<%= classifiedModuleName %>(id: number) {
    return Observable.of(true);
  }

  public load<%= classifiedModuleName %>(): Observable<any[]> {
    return Observable.of(this.data<%= classifiedModuleName %>);
  }
}
