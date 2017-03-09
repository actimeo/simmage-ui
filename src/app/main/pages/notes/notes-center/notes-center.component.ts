import { NotesService } from './../../../../services/backend/notes.service';
import { Component, OnInit, OnChanges, OnDestroy, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { DbMainmenu } from './../../../../services/backend/db-models/portal';

@Component({
  selector: 'app-notes-center',
  templateUrl: './notes-center.component.html',
  styleUrls: ['./notes-center.component.css']
})
export class NotesCenterComponent implements OnInit {

  public mainmenu: Observable<DbMainmenu>;

  constructor(public notesService: NotesService, private r: ActivatedRoute) { }

  ngOnInit() {
    this.mainmenu = this.r.data.pluck('data');
  }
}
