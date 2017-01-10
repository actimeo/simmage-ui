import { Injectable } from '@angular/core';
import { NoteJson } from './../../../db-models/json';
import { Observable } from 'rxjs/Observable';
import { PgService } from './../../../pg.service';

@Injectable()
export class NoteService {

  constructor(private pg: PgService) { }

  public getNote(not_id: number): Observable<NoteJson> {
    let req = {
      not_id: true,
      not_object: true,
      not_text: true,
      not_event_date: true,
      topics: {
        top_id: true,
      },
      dossiers: {
        dos_id: true,
      }
    };

    return this.pg.pgcall('notes/note_json', {
      prm_not_ids: [not_id],
      req: JSON.stringify(req)
    });
  }

  public addNote(content: string, eventDate: string, object: string, topics: number[], dossiers: number[]): Observable<number> {
    return this.pg.pgcall('notes/note_add', {
      prm_text: content,
      prm_creation_date: Date.now(),
      prm_event_date: eventDate,
      prm_object: object,
      prm_topics: topics,
      prm_dossiers: dossiers
    });
  }

  public updateNote(not_id: number, content: string, eventDate: string, object: string, topics: number[], dossiers: number[]) {
    return this.pg.pgcall('notes/note_update', {
      prm_not_id: not_id,
      prm_text: content,
      prm_event_date: eventDate,
      prm_object: object,
      prm_topics: topics,
      prm_dossiers: dossiers
    });
  }

  public deleteNote(not_id: number) {
    return this.pg.pgcall('notes/note_delete', {
      prm_not_id: not_id
    });
  }

}
