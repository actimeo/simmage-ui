import { UserData } from './../../../data/user-data';
import { UserService } from './../../../user.service';
import { Subscription } from 'rxjs/Subscription';
import { DocumentJson } from './../../../db-models/json';
import { Observable } from 'rxjs/Observable';
import { DocumentsService } from './../../../shared/documents.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { DbMainmenu } from './../../../db-models/portal';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit, OnDestroy {

  @Input() mainmenu: DbMainmenu;

  private subs: Subscription[] = [];
  documents: Observable<DocumentJson[]>;

  constructor(public documentsService: DocumentsService, private user: UserService) { }

  ngOnInit() {
    this.subs.push(this.user.userDataState
      .map((u: UserData) => u.selectedGrpId)
      .distinctUntilChanged()
      .subscribe(grpId => this.loadDocuments(grpId)));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  loadDocuments(grpId: number) {
    this.documents = this.documentsService.loadDocumentsInView(this.mainmenu.mme_content_id, grpId);
  }
}
