import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../shared/user.service';
import { PgService } from '../../pg.service';
// import { Db<%= classifiedModuleName %> } from '../../../db-models/"schema"';

class Db<%= classifiedModuleName %> {
  // TODO : add this class backend side, replace "schema" by the good emplacement,
  // then remove this local class and uncomment the previous import
}

@Injectable()
export class <%= classifiedModuleName %>Service {

  constructor(private user: UserService, private pg: PgService) { }

  public get<%= classifiedModuleName %>(id: number): Observable<Db<%= classifiedModuleName %>> {
    return this.pg.pgcall('<%= dbprefix %>_get', {
      prm_token: this.user.userData.token,
      prm_id: id
    });
  }

  public update<%= classifiedModuleName %>(id: number, name: string): Observable<boolean> {
    return this.pg.pgcall('<%= dbprefix %>_update', {
      prm_token: this.user.userData.token,
      prm_id: id,
      prm_name: name
    });
  }

  public add<%= classifiedModuleName %>(name: string): Observable<number> {
    return this.pg.pgcall('<%= dbprefix %>_add', {
      prm_token: this.user.userData.token,
      prm_name: name
    });
  }

  public delete<%= classifiedModuleName %>(id: number) {
    return this.pg.pgcall('<%= dbprefix %>_delete', {
      prm_token: this.user.userData.token,
      prm_id: id
    });
  }

  public load<%= classifiedModuleName %>(): Observable<any[]> {
    return this.pg.pgcall('<%= dbprefix %>_list', {
      prm_token: this.user.userData.token
    });
  }
}
