import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../services/utils/user.service';
import { PgService } from '../../services/backend/pg.service';
import { DbObjectivesviewGet } from '../../services/backend/db-models/objectives';

@Injectable()
export class ObjectivesViewsService {

  constructor(private user: UserService, private pg: PgService) { }

  public getObjectivesViews(id: number): Observable<DbObjectivesviewGet> {
    return this.pg.pgcall('objectives/objectivesview_get', {
      prm_id: id
    });
  }

  public updateObjectivesViews(id: number, name: string, top_ids: number[]): Observable<boolean> {
    return this.pg.pgcall('objectives/objectivesview_update', {
      prm_id: id,
      prm_name: name,
      prm_top_ids: top_ids
    });
  }

  public addObjectivesViews(name: string, top_ids: number[]): Observable<number> {
    return this.pg.pgcall('objectives/objectivesview_add', {
      prm_name: name,
      prm_top_ids: top_ids
    });
  }

  public deleteObjectivesViews(id: number) {
    return this.pg.pgcall('objectives/objectivesview_delete', {
      prm_id: id
    });
  }

  public loadObjectivesViews(): Observable<any[]> {
    return this.pg.pgcall('objectives/objectivesview_list', {
    });
  }
}
