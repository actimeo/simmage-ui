import { NotesService } from './../../../../shared/notes.service';
import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { DbMainmenu } from './../../../../db-models/portal';
import { DbTopic } from './../../../../db-models/organ';

@Component({
  selector: 'app-notes-center',
  templateUrl: './notes-center.component.html',
  styleUrls: ['./notes-center.component.css']
})
export class NotesCenterComponent implements OnInit, OnChanges, OnDestroy {
  
  private viewTopics: Observable<DbTopic[]>;
  private idSub: Subscription;
  private mainmenu: Observable<DbMainmenu>;
  private contentId: number;

  constructor(public notesService: NotesService, private r: ActivatedRoute) { }

  ngOnInit() {
    this.mainmenu = this.r.data.pluck<DbMainmenu>('data');
    this.idSub = this.r.data.pluck<DbMainmenu>('data').distinctUntilChanged().subscribe(data => {
      this.contentId = data.mme_content_id;
      this.viewTopics = this.notesService.loadViewTopics(this.contentId);
    });
  }

  ngOnChanges() {
    this.viewTopics = this.notesService.loadViewTopics(this.contentId);
  }
  
  ngOnDestroy() {
    if (this.idSub) {
      this.idSub.unsubscribe();
    }
  }
}
