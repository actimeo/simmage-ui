import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../services/utils/user.service';
import { PgService } from '../../services/backend/pg.service';
import { DbNotesviewGet } from '../../services/backend/db-models/notes';

@Injectable()
export class NotesViewsService {

  constructor(private user: UserService, private pg: PgService) { }

  public getNotesViews(id: number): Observable<DbNotesviewGet> {
    return this.pg.pgcall('notes/notesview_get', {
      prm_id: id
    });
  }

  public updateNotesViews(id: number, name: string, top_ids: number[]): Observable<boolean> {
    return this.pg.pgcall('notes/notesview_update', {
      prm_id: id,
      prm_name: name,
      prm_top_ids: top_ids
    });
  }

  public addNotesViews(name: string, top_ids: number[]): Observable<number> {
    return this.pg.pgcall('notes/notesview_add', {
      prm_name: name,
      prm_top_ids: top_ids
    });
  }

  public deleteNotesViews(id: number) {
    return this.pg.pgcall('notes/notesview_delete', {
      prm_id: id
    });
  }

  public loadNotesViews(): Observable<any[]> {
    return this.pg.pgcall('notes/notesview_list', {
    });
  }
}
