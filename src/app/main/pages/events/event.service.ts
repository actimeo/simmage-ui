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
      ety_category: true,
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
      },
      participants: {
        par_id: true
      },
      resources: {
        res_id: true
      }
    };
    return this.pg.pgcall('events/event_json', {
      prm_eve_ids: [eve_id],
      req: JSON.stringify(req)
    });
  }

  public addEvent(title: string,
                  type: number,
                  duration: string,
                  startdate: string,
                  enddate: string,
                  place: string,
                  cost: string,
                  description: string,
                  sumup: string,
                  recurent: boolean,
                  occurence: string,
                  docctime: number,
                  mocctime: string,
                  occrepeat: number,
                  topics: number[],
                  dossiers: number[],
                  participants: number[],
                  resources: number[]): Observable<number> {


    return this.pg.pgcall('events/event_add', {
      prm_title: title,
      prm_ety_id: type,
      prm_duration: duration,
      prm_start_time: startdate + " 00:00:00",
      prm_end_time: enddate + " 01:00:00",
      prm_place: place,
      prm_cost: cost,
      prm_description: description,
      prm_sumup: sumup,
      prm_recurent: recurent,
      prm_occurence: occurence,
      prm_docctime: docctime,
      prm_mocctime: mocctime,
      prm_occrepeat: occrepeat,
      prm_topics: topics,
      prm_dossiers: dossiers,
      prm_participants: participants,
      prm_resources: resources
    });
  }

  public editEvent(id: number,
                  title: string,
                  type: number,
                  duration: string,
                  startdate: string,
                  enddate: string,
                  place: string,
                  cost: string,
                  description: string,
                  sumup: string,
                  recurent: boolean,
                  occurence: string,
                  docctime: number,
                  mocctime: string,
                  occrepeat: number,
                  topics: number[],
                  dossiers: number[],
                  participants: number[],
                  resources: number[]) {
    return this.pg.pgcall('events/event_update', {
      prm_eve_id: id,
      prm_title: title,
      prm_ety_id: type,
      prm_duration: duration,
      prm_start_time: startdate + " 00:00:00",
      prm_end_time: enddate + " 01:00:00",
      prm_place: place,
      prm_cost: cost,
      prm_description: description,
      prm_sumup: sumup,
      prm_recurent: recurent,
      prm_occurence: occurence,
      prm_docctime: docctime,
      prm_mocctime: mocctime,
      prm_occrepeat: occrepeat,
      prm_topics: topics,
      prm_dossiers: dossiers,
      prm_participants: participants,
      prm_resources: resources
    });
  }

  public deleteEvent(id: number) {
    return this.pg.pgcall('events/event_delete', {
      prm_eve_id: id
    });
  }

}
