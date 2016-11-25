import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import '../../../rxjs_operators';

import { DbNotesviewGet } from '../../../db-models/notes';

@Component({
  selector: 'app-notes-views-list',
  templateUrl: './notes-views-list.component.html',
  styleUrls: ['./notes-views-list.component.css']
})
export class NotesViewsListComponent implements OnInit {

  public notesViewsData: Observable<any[]>;
  public selectedId: Observable<number>;

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.notesViewsData = this.route.data.pluck<DbNotesviewGet[]>('list');
    this.selectedId = this.route.params.pluck<number>('selid');
  }
}
