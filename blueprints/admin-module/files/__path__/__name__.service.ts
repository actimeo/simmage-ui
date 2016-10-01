import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../shared/user.service';
import { PgService } from '../../pg.service';


@Injectable()
export class <%= classifiedModuleName %>Service {

  constructor() { }

  private data: any[] = [{
      id: 1,
      name: 'a name'
    },
    {
      id: 2,
      name: 'another name'
    }];

  public load(id: number): Observable<any> {
    return Observable.of(this.data[id-1]);
  }

  public update(id: number, name: string): Observable<boolean> {
    return Observable.of(true);
  }

  public add(name: string): Observable<number> {
    return Observable.of(2);
  }

  public delete(id: number) {
    return Observable.of(true);
  }

  public loadAll(): Observable<any[]> {
    return Observable.of(this.data);
  }
}
