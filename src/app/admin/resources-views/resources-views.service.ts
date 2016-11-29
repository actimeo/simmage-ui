import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../user.service';
import { PgService } from '../../pg.service';
import { DbResourcesviewGet } from '../../db-models/resources';

@Injectable()
export class ResourcesViewsService {

  constructor(private user: UserService, private pg: PgService) { }

  public getResourcesViews(id: number): Observable<DbResourcesviewGet> {
    return this.pg.pgcall('resources/resourcesview_get', {
      prm_id: id
    });
  }

  public updateResourcesViews(id: number, name: string, top_ids: number[]): Observable<boolean> {
    return this.pg.pgcall('resources/resourcesview_update', {
      prm_id: id,
      prm_name: name,
      prm_top_ids: top_ids
    });
  }

  public addResourcesViews(name: string, top_ids: number[]): Observable<number> {
    return this.pg.pgcall('resources/resourcesview_add', {
      prm_name: name,
      prm_top_ids: top_ids
    });
  }

  public deleteResourcesViews(id: number) {
    return this.pg.pgcall('resources/resourcesview_delete', {
      prm_id: id
    });
  }

  public loadResourcesViews(): Observable<any[]> {
    return this.pg.pgcall('resources/resourcesview_list', {
    });
  }
}
