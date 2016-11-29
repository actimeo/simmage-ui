import { NoteJson } from './../db-models/json';
import { PgService } from './../pg.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class NotesService {

  constructor(private pg: PgService) { }

  public loadNotesInView(nov_id: number, grp_id: number): Observable<NoteJson[]> {
    let req = {
      not_id: true,
      not_text: true,
      not_object: true,
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
      'notes/note_in_view_list', {
        prm_nov_id: nov_id,
        prm_grp_id: grp_id,
        req: JSON.stringify(req)
      });
  }

  public loadViewTopics(nov_id: number): Observable<string[]> {
    return this.pg.pgcall('notes/notesview_get_topics', { prm_id: nov_id });
  }
}
