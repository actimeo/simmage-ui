import { UserData } from './../../../data/user-data';
import { UserService } from './../../../user.service';
import { Subscription } from 'rxjs/Subscription';
import { DocumentJson } from './../../../db-models/json';
import { Observable } from 'rxjs/Observable';
import { DocumentsService } from './../../../shared/documents.service';
import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';

import { DbMainmenu } from './../../../db-models/portal';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() mainmenu: DbMainmenu;

  private subs: Subscription[] = [];
  documents: Observable<DocumentJson[]>;
  private currentGrpId: number = null;
  private viewTopics: string[];

  constructor(public documentsService: DocumentsService, private user: UserService) { }

  ngOnInit() {
    this.subs.push(this.user.userDataState
      .map((u: UserData) => u.selectedGrpId)
      .distinctUntilChanged()
      .subscribe(grpId => {
        this.currentGrpId = grpId > 0 ? grpId : null;
        this.loadDocuments();
      }));
      this.documentsService.loadViewTopics(this.mainmenu.mme_content_id).subscribe(topics => this.viewTopics = topics);
  }

  ngOnChanges() {
    this.loadDocuments();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  loadDocuments() {
    this.documents = this.documentsService.loadDocumentsInView(this.mainmenu.mme_content_id, this.currentGrpId);
  }
}
