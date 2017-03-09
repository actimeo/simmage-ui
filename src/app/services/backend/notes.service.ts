import { NoteJson } from './db-models/json';
import { PgService } from './pg.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class NotesService {

  constructor(private pg: PgService) { }

  public loadNotesInView(nov_id: number, grp_id: number): Observable<NoteJson[]> {
    const req = {
      not_id: true,
      not_text: true,
      not_object: true,
      not_event_date: true,
      not_creation_date: true,
      nor_acknowledge_receipt: true,
      author: {
        par_id: true,
        par_lastname: true,
        par_firstname: true
      },
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
      },
      recipients_info: {
        par_id: true,
        par_lastname: true,
        par_firstname: true,
        nor_for_action: true,
        nor_acknowledge_receipt: true
      },
      recipients_action: {
        par_id: true,
        par_lastname: true,
        par_firstname: true,
        nor_for_action: true,
        nor_acknowledge_receipt: true
      }
    };
    return this.pg.pgcall(
      'notes/note_in_view_list', {
        prm_nov_id: nov_id,
        prm_grp_id: grp_id,
        req: JSON.stringify(req)
      });
  }

  public loadViewTopics(nov_id: number): Observable<any[]> {
    return this.pg.pgcall('notes/notesview_get_topics', { prm_id: nov_id });
  }

  public loadNotesForUser(eventDateOrdering: boolean, descendingOrdering: boolean): Observable<NoteJson[]> {
    const req = {
      not_id: true,
      not_text: true,
      not_object: true,
      not_event_date: true,
      not_creation_date: true,
      nor_acknowledge_receipt: true,
      author: {
        par_id: true,
        par_lastname: true,
        par_firstname: true
      },
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
      },
      recipients_info: {
        par_id: true,
        par_lastname: true,
        par_firstname: true,
        nor_for_action: true,
        nor_acknowledge_receipt: true
      },
      recipients_action: {
        par_id: true,
        par_lastname: true,
        par_firstname: true,
        nor_for_action: true,
        nor_acknowledge_receipt: true
      }
    };

    return this.pg.pgcall('notes/note_participant_list', {
      prm_column_ordering: eventDateOrdering ? 'not_event_date' : 'not_creation_date',
      prm_desc: descendingOrdering,
      req: JSON.stringify(req)
    });
  }

  public acknowledgeNoteReceipt(note: number) {
    return this.pg.pgcall('notes/note_user_acknowledge_receipt', {
      prm_not_id: note
    });
  }
}
