import { ObjectiveJson } from './db-models/json';
import { PgService } from './pg.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class ObjectivesService {

constructor(private pg: PgService) { }

  public loadObjectivesInView(obv_id: number, grp_id: number): Observable<ObjectiveJson[]> {
    let req = {
      obj_id: true,
      obj_name: true,
      topics: {
        top_id: true,
        top_name: true,
        top_icon: true,
        top_color: true
      },
      dossiers: {
        dos_id: true,
        dos_firstname: true,
        dos_lastname: true
      }
    };
    return this.pg.pgcall(
      'objectives/objective_in_view_list', {
        prm_obv_id: obv_id,
        prm_grp_id: grp_id,
        req: JSON.stringify(req)
      });
  }

  public loadViewTopics(obv_id: number): Observable<any[]> {
    return this.pg.pgcall('objectives/objectivesview_get_topics', { prm_id: obv_id });
  }
}
