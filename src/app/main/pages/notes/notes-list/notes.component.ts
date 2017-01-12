import { UserData } from './../../../../data/user-data';
import { NotesService } from './../../../../shared/notes.service';
import { UserService } from './../../../../user.service';
import { NoteJson } from './../../../../db-models/json';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DbMainmenu } from './../../../../db-models/portal';
import { DbTopic } from './../../../../db-models/organ';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];
  notes: NoteJson[];
  viewTopics: DbTopic[];

  private currentGrpId: number = null;
  private contentId: number = null;

  constructor(public notesService: NotesService, private user: UserService, private r: ActivatedRoute) { }

  ngOnInit() {
    // Listen for group change
    this.subs.push(this.user.userDataState
      .map((u: UserData) => u.selectedGrpId)
      .distinctUntilChanged()
      .subscribe(grpId => {
        this.currentGrpId = grpId > 0 ? grpId : null;
        this.loadNotes();
      }));

    // Listen for mainmenu change
    this.subs.push(this.r.data.pluck('data')
      .distinctUntilChanged().subscribe((data: DbMainmenu) => {
        this.contentId = data.mme_content_id;
        this.subs.push(this.notesService.loadViewTopics(this.contentId)
          .subscribe(data => this.viewTopics = data));
          this.loadNotes();
      }));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private loadNotes() {
    this.subs.push(this.notesService.loadNotesInView(this.contentId, this.currentGrpId)
    .subscribe(data => this.notes = data));
  }
}
