import { Injectable } from '@angular/core';
import { EventJson } from './../../../db-models/json';
import { Observable } from 'rxjs/Observable';
import { PgService } from './../../../pg.service';

@Injectable()
export class EventService {

  constructor(private pg: PgService) { }

  public getEvent(eve_id: number): Observable<EventJson> {
    let req = {
      eve_id: true,
      eve_title: true,
      ety_id: true,
      eve_duration: true,
      eve_start_time: true,
      eve_end_time: true,
      eve_place: true,
      eve_cost: true,
      eve_description: true,
      eve_sumup: true,
      topics: {
        top_id: true,
      },
      dossiers: {
        dos_id: true,
      }
    };
    return this.pg.pgcall('events/event_json', {
      prm_eve_ids: [eve_id],
      req: JSON.stringify(req)
    });
  }

  public addEvent(): Observable<number> {
    return Observable.of(1);
  }

  public editEvent() {
    return Observable.of(null);
  }

  public deleteEvent() {
    return Observable.of(null);
  }

}
