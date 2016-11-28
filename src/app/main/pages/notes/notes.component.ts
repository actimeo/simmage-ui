import { UserData } from './../../../data/user-data';
import { NotesService } from './../../../shared/notes.service';
import { UserService } from './../../../user.service';
import { NoteJson } from './../../../db-models/json';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { DbMainmenu } from './../../../db-models/portal';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, OnDestroy {

  @Input() mainmenu: DbMainmenu;

  private subs: Subscription[] = [];
  notes: Observable<NoteJson[]>;

  constructor(public notesService: NotesService, private user: UserService) { }

  ngOnInit() {
    this.subs.push(this.user.userDataState
      .map((u: UserData) => u.selectedGrpId)
      .distinctUntilChanged()
      .subscribe(grpId => this.loadNotes(grpId)));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  loadNotes(grpId: number) {
    this.notes = this.notesService.loadNotesInView(this.mainmenu.mme_content_id, grpId > 0 ? grpId : null);
  }
}
