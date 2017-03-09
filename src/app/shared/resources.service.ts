import { ResourceJson } from './../db-models/json';
import { Observable } from 'rxjs/Observable';
import { PgService } from './../services/backend/pg.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ResourcesService {

  constructor(private pg: PgService) { }

  public loadResourcesInView(rev_id: number, grp_id: number): Observable<ResourceJson[]> {
    let req = {
      res_id: true,
      res_name: true,
      topics: {
        top_id: true,
        top_name: true,
        top_icon: true,
        top_color: true
      }
    };
    return this.pg.pgcall(
      'resources/resource_in_view_list', {
        prm_rev_id: rev_id,
        req: JSON.stringify(req)
      });
  }

  public loadViewTopics(rev_id: number): Observable<any[]> {
    return this.pg.pgcall('resources/resourcesview_get_topics', { prm_id: rev_id });
  }
}
