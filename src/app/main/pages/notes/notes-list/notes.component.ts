import { UserData } from './../../../../data/user-data';
import { NotesService } from './../../../../services/backend/notes.service';
import { UserService } from './../../../../services/utils/user.service';
import { FormsDialogService } from './../../../../services/utils/forms-dialog.service';
import { NoteJson } from './../../../../services/backend/db-models/json';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DbMainmenu } from './../../../../services/backend/db-models/portal';
import { DbTopic } from './../../../../services/backend/db-models/organ';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];
  notes: NoteJson[];
  notesObs: Observable<NoteJson[]>;
  viewTopics: DbTopic[];
  viewId: number;

  focusedNote: number;

  private currentGrpId: number = null;
  private contentId: number = null;

  constructor(public notesService: NotesService, private user: UserService,
    private r: ActivatedRoute, private formsDialog: FormsDialogService) { }

  ngOnInit() {
    // Listen for group change
    const grpId$ = this.user.userDataState
      .map((u: UserData) => u.selectedGrpId)
      .distinctUntilChanged()
      .do((grpId: number) => {
        this.currentGrpId = grpId > 0 ? grpId : null;
      });

    // Listen for mainmenu change
    const mainmenu$ = this.r.data.pluck('data')
      .distinctUntilChanged()
      .do((mainmenu: DbMainmenu) => {
        this.viewId = mainmenu.mme_id;
        this.contentId = mainmenu.mme_content_id;
        this.subs.push(this.notesService.loadViewTopics(this.contentId)
          .subscribe(data => this.viewTopics = data));
     });

    this.subs.push(Observable.combineLatest(grpId$, mainmenu$)
      .subscribe(([grpId, mainmenu]: [number, DbMainmenu]) => {
        this.notesObs = this.notesService.loadNotesInView(this.contentId, this.currentGrpId);
        this.loadNotes();
      }));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private loadNotes() {
    this.notesObs.subscribe(data => this.notes = data);
  }

  isCurrentUser(fName, lName) {
    return fName === JSON.parse(localStorage['auth_firstname']) && lName === JSON.parse(localStorage['auth_lastname']);
  }

  setFocused(id) {
    this.focusedNote = this.focusedNote !== id ? id : null;
  }

  forwardNote(event, note) {
    event.stopPropagation();
    this.formsDialog.openForm(note).subscribe(s => { if (s == 'success') this.loadNotes() });
  }
}
