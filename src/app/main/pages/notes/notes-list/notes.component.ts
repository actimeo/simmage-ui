import { UserData } from './../../../../data/user-data';
import { NotesService } from './../../../../shared/notes.service';
import { UserService } from './../../../../user.service';
import { NoteJson } from './../../../../db-models/json';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DbMainmenu } from './../../../../db-models/portal';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, OnChanges, OnDestroy {

  private subs: Subscription[] = [];
  notes: Observable<NoteJson[]>;
  private currentGrpId: number = null;
  private contentId: number;
  private viewId: number;

  constructor(public notesService: NotesService, private user: UserService, private r: ActivatedRoute) { }

  ngOnInit() {
    this.subs.push(this.user.userDataState
      .map((u: UserData) => u.selectedGrpId)
      .distinctUntilChanged()
      .subscribe(grpId => {
        this.currentGrpId = grpId > 0 ? grpId : null;
      }));
    this.subs.push(this.r.data.pluck<DbMainmenu>('data').distinctUntilChanged().subscribe(data => {
      this.viewId = data.mme_id;
      this.contentId = data.mme_content_id;
      this.notes = this.notesService.loadNotesInView(this.contentId, this.currentGrpId);
    }));
  }

  ngOnChanges(changes: SimpleChanges) {
    this.notes = this.notesService.loadNotesInView(this.contentId, this.currentGrpId);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
