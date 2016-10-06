import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../shared/user.service';
import { PgService } from '../../pg.service';
// import { DbEventsTypes } from '../../../db-models/"schema"';

class DbEventsTypes {
  // TODO : add this class backend side, replace "schema" by the good emplacement,
  // then remove this local class and uncomment the previous import
}

@Injectable()
export class EventsTypesService {

  constructor(private user: UserService, private pg: PgService) { }

  public getEventsTypes(id: number): Observable<DbEventsTypes> {
    return this.pg.pgcall('"schema"/eventsTypes_get', {
      prm_token: this.user.userData.token,
      prm_id: id
    });
  }

  public updateEventsTypes(id: number, name: string): Observable<boolean> {
    return this.pg.pgcall('"schema"/eventsTypes_update', {
      prm_token: this.user.userData.token,
      prm_id: id,
      prm_name: name
    });
  }

  public addEventsTypes(name: string): Observable<number> {
    return this.pg.pgcall('"schema"/eventsTypes_add', {
      prm_token: this.user.userData.token,
      prm_name: name
    });
  }

  public deleteEventsTypes(id: number) {
    return this.pg.pgcall('"schema"/eventsTypes_delete', {
      prm_token: this.user.userData.token,
      prm_id: id
    });
  }

  public loadEventsTypes(): Observable<any[]> {
    return this.pg.pgcall('"schema"/eventsTypes_list', {
      prm_token: this.user.userData.token
    });
  }
}
