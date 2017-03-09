import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import '../../../rxjs_operators';

import { DbDocumentsviewGet } from '../../../services/backend/db-models/documents';

@Component({
  selector: 'app-documents-views-list',
  templateUrl: './documents-views-list.component.html',
  styleUrls: ['./documents-views-list.component.css']
})
export class DocumentsViewsListComponent implements OnInit {

  public documentsViewsData: Observable<any[]>;
  public selectedId: Observable<number>;

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.documentsViewsData = this.route.data.pluck('list');
    this.selectedId = this.route.params.pluck('selid');
  }
}
