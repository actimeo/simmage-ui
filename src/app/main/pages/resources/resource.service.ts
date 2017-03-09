import { Injectable } from '@angular/core';
import { ResourceJson } from './../../../services/backend/db-models/json';
import { Observable } from 'rxjs/Observable';
import { PgService } from './../../../services/backend/pg.service';

@Injectable()
export class ResourceService {

  constructor(private pg: PgService) { }

  public getResource(res_id: number): Observable<ResourceJson> {
    const req = {
      res_id: true,
      res_name: true,
      topics: {
        top_id: true,
      }
    };

    return this.pg.pgcall('resources/resource_json', {
      prm_res_ids: [res_id],
      req: JSON.stringify(req)
    });
  }

  public addResource(name: string, topics: number[]): Observable<number> {
    return this.pg.pgcall('resources/resource_add', {
      prm_name: name,
      prm_topics: topics
    });
  }

  public updateResource(id: number, name: string, topics: number[]) {
    return this.pg.pgcall('resources/resource_update', {
      prm_res_id: id,
      prm_name: name,
      prm_top_ids: topics
    });
  }

  public deleteResource(id: number) {
    return this.pg.pgcall('resources/resource_delete', {
      prm_res_id: id
    });
  }

}
