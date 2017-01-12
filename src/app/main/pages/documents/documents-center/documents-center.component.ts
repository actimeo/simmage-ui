import { DocumentsService } from './../../../../shared/documents.service';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { DbMainmenu } from './../../../../db-models/portal';

@Component({
  selector: 'app-documents-center',
  templateUrl: './documents-center.component.html',
  styleUrls: ['./documents-center.component.css']
})
export class DocumentsCenterComponent implements OnInit {

  public mainmenu: Observable<DbMainmenu>;

  constructor(public documentsService: DocumentsService, private r: ActivatedRoute) { }

  ngOnInit() {
    this.mainmenu = this.r.data.pluck('data');
  }
}
