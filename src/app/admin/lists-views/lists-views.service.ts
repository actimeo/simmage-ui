import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../user.service';
import { PgService } from '../../pg.service';
import { DbListsviewList } from '../../db-models/lists';

@Injectable()
export class ListsViewsService {

  constructor(private user: UserService, private pg: PgService) { }

  public getListsViews(id: number): Observable<DbListsviewList> {
    return this.pg.pgcall('lists/listsview_get', {
      prm_id: id
    });
  }

  public updateListsViews(id: number, name: string): Observable<boolean> {
    return this.pg.pgcall('lists/listsview_update', {
      prm_id: id,
      prm_name: name
    });
  }

  public addListsViews(name: string): Observable<number> {
    return this.pg.pgcall('lists/listsview_add', {
      prm_name: name
    });
  }

  public deleteListsViews(id: number) {
    return this.pg.pgcall('lists/listsview_delete', {
      prm_id: id
    });
  }

  public loadListsViews(): Observable<any[]> {
    return this.pg.pgcall('lists/listsview_list', {
    });
  }
}
