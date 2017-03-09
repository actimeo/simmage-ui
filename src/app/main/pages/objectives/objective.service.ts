import { Injectable } from '@angular/core';
import { ObjectiveJson } from './../../../services/backend/db-models/json';
import { Observable } from 'rxjs/Observable';
import { PgService } from './../../../services/backend/pg.service';

@Injectable()
export class ObjectiveService {

  constructor(private pg: PgService) { }

  public getObjective(obj_id: number): Observable<ObjectiveJson> {
    const req = {
      obj_id: true,
      obj_name: true,
      obj_start_date: true,
      obj_end_date: true,
      obj_status: true,
      author: true,
      topics: {
        top_id: true,
      },
      dossier: {
        dos_id: true,
      }
    };

    return this.pg.pgcall('objectives/objective_json', {
      prm_obj_ids: [obj_id],
      req: JSON.stringify(req)
    });
  }

  public addObjective(name: string, obj_status: string, startlineDate: string,
                      deadlineDate: string, topics: number[], dossier: number[]): Observable<number> {
    return this.pg.pgcall('objectives/objective_add', {
      prm_name: name,
      prm_status: obj_status,
      prm_start_date: startlineDate,
      prm_end_date: deadlineDate,
      prm_topics: topics,
      prm_dossier: dossier[0]
    });
  }

  public updateObjective(obj_id: number, name: string, obj_status: string,
                         startlineDate: string, deadlineDate: string, topics: number[], dossier: number[]) {
    return this.pg.pgcall('objectives/objective_update', {
      prm_obj_id: obj_id,
      prm_name: name,
      prm_status: obj_status,
      prm_start_date: startlineDate,
      prm_end_date: deadlineDate,
      prm_topics: topics,
      prm_dossier: dossier[0]
    });
  }

  public deleteObjective(obj_id: number) {
    return this.pg.pgcall('objectives/objective_delete', {
      prm_obj_id: obj_id
    });
  }

}
