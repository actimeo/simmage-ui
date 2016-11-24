import { DocumentJson } from './../../../db-models/json';
import { Observable } from 'rxjs/Observable';
import { DocumentsService } from './../../../shared/documents.service';
import { Component, OnInit, Input } from '@angular/core';

import { DbMainmenu } from './../../../db-models/portal';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  @Input() mainmenu: DbMainmenu;

  documents: Observable<DocumentJson[]>;

  constructor(public documentsService: DocumentsService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log(this.mainmenu);
    console.log('call with id ' + this.mainmenu.mme_content_id);
    if (this.mainmenu) {
      this.documents = this.documentsService.loadDocumentsInView(this.mainmenu.mme_content_id);
    }
  }
}
