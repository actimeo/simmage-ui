import { Injectable } from '@angular/core';
import { NoteJson } from './../../../services/backend/db-models/json';
import { Observable } from 'rxjs/Observable';
import { PgService } from './../../../services/backend/pg.service';

@Injectable()
export class NoteService {

  constructor(private pg: PgService) { }

  public getNote(not_id: number): Observable<NoteJson> {
    const req = {
      not_id: true,
      not_object: true,
      not_text: true,
      not_event_date: true,
      not_creation_date: true,
      author: true,
      topics: {
        top_id: true,
      },
      dossiers: {
        dos_id: true,
      },
      recipients: {
        nor_for_action: true,
        par_id: true
      }
    };

    return this.pg.pgcall('notes/note_json', {
      prm_not_ids: [not_id],
      req: JSON.stringify(req)
    });
  }

  public addNote(content: string, eventDate: string, object: string, topics: number[],
                 dossiers: number[], rcptInfo: number[], rcptAction: number[]): Observable<number> {
    return this.pg.pgcall('notes/note_add', {
      prm_text: content,
      prm_event_date: eventDate,
      prm_object: object,
      prm_topics: topics,
      prm_dossiers: dossiers,
      prm_recipients_info: rcptInfo,
      prm_recipients_action: rcptAction
    });
  }

  public updateNote(not_id: number, content: string, eventDate: string, object: string,
                    topics: number[], dossiers: number[], rcptInfo: number[], rcptAction: number[]) {
    return this.pg.pgcall('notes/note_update', {
      prm_not_id: not_id,
      prm_text: content,
      prm_event_date: eventDate,
      prm_object: object,
      prm_topics: topics,
      prm_dossiers: dossiers,
      prm_recipients_info: rcptInfo,
      prm_recipients_action: rcptAction
    });
  }

  public deleteNote(not_id: number) {
    return this.pg.pgcall('notes/note_delete', {
      prm_not_id: not_id
    });
  }

}
