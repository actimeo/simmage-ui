import { UserData } from './../../../data/user-data';
import { NotesService } from './../../../shared/notes.service';
import { UserService } from './../../../user.service';
import { NoteJson } from './../../../db-models/json';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';

import { DbMainmenu } from './../../../db-models/portal';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, OnChanges, OnDestroy {

  @Input() mainmenu: DbMainmenu;

  private subs: Subscription[] = [];
  notes: Observable<NoteJson[]>;
  private currentGrpId: number = null;
  private viewTopics: string[];

  constructor(public notesService: NotesService, private user: UserService) { }

  ngOnInit() {
    this.subs.push(this.user.userDataState
      .map((u: UserData) => u.selectedGrpId)
      .distinctUntilChanged()
      .subscribe(grpId => {
        this.currentGrpId = grpId > 0 ? grpId : null;
        this.loadNotes();
      }));
    this.notesService.loadViewTopics(this.mainmenu.mme_content_id).subscribe(topics => this.viewTopics = topics);
  }

  ngOnChanges() {
    this.loadNotes();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  loadNotes() {
    this.notes = this.notesService.loadNotesInView(this.mainmenu.mme_content_id, this.currentGrpId);
  }
}
