import { UserData } from './../../../data/user-data';
import { UserService } from './../../../services/utils/user.service';
import { Subscription } from 'rxjs/Subscription';
import { DocumentJson } from './../../../services/backend/db-models/json';
import { Observable } from 'rxjs/Observable';
import { DocumentsService } from './../../../services/backend/documents.service';
import { Component, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DbMainmenu } from './../../../services/backend/db-models/portal';
import { DbTopic } from './../../../services/backend/db-models/organ';
import { FormsDialogService } from './../../../services/utils/forms-dialog.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];
  public documents: DocumentJson[];
  viewTopics: DbTopic[];
  viewTitle: string;

  private currentGrpId: number = null;
  private contentId: number = null;

  constructor(public documentsService: DocumentsService, private user: UserService,
              private r: ActivatedRoute, private dialog: FormsDialogService) { }

  ngOnInit() {
    // Listen for group change
    const grpId$ = this.user.userDataState
      .map((u: UserData) => u.selectedGrpId)
      .distinctUntilChanged()
      .do((grpId: number) => {
        this.currentGrpId = grpId > 0 ? grpId : null;
      });

    // Listen for mainmenu change
    const mainmenu$ = this.r.data.pluck('data')
      .distinctUntilChanged()
      .do((mainmenu: DbMainmenu) => {
        this.viewTitle = mainmenu.mme_title;
        this.contentId = mainmenu.mme_content_id;
        this.subs.push(this.documentsService.loadViewTopics(this.contentId)
          .subscribe(data => this.viewTopics = data));
      });

    this.subs.push(Observable.combineLatest(grpId$, mainmenu$)
      .subscribe(([grpId, mainmenu]: [number, DbMainmenu]) => {
        this.loadDocuments();
      }));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private loadDocuments() {
    this.subs.push(this.documentsService.loadDocumentsInView(this.contentId, this.currentGrpId)
      .subscribe(data => this.documents = data));
  }

  openDocumentForm(doc?: number) {
    this.subs.push(this.dialog.openDocumentForm({ contentId: this.contentId, docId: doc }).subscribe(doc => {
      this.loadDocuments();
    }));
  }

}
