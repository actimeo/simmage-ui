import { UserData } from './../../../data/user-data';
import { UserService } from './../../../services/utils/user.service';
import { Subscription } from 'rxjs/Subscription';
import { DocumentJson } from './../../../services/backend/db-models/json';
import { Observable } from 'rxjs/Observable';
import { DocumentsService } from './../../../services/backend/documents.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
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
  public documentsAvailable: DocumentJson[];
  public documentsScheduled: DocumentJson[];
  public documentsInProgress: DocumentJson[];
  viewTopics: DbTopic[];
  viewTitle: string;

  selectedTab: number = 0;

  totalDocuments: string;

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

  private loadDocuments(docId = null) {
    this.subs.push(this.documentsService.loadDocumentsInView(this.contentId, this.currentGrpId)
      .subscribe(data => {
        this.documentsAvailable = data.filter(doc => doc.doc_status === 'available');
        this.documentsScheduled = data.filter(doc => doc.doc_status === 'scheduled');
        this.documentsInProgress = data.filter(doc => doc.doc_status === 'in progress');

        let docStatus = 'available';

        if (docId !== null) {
          docStatus = data.find(doc => doc.doc_id === docId).doc_status;
          this.selectedTab = docStatus === 'available' ? 0 : docStatus === 'scheduled' ? 1 : 2;
        }

        this.setTotalDocuments(docStatus);
      }));
  }

  setTotalDocuments(status) {
    this.totalDocuments = (this.selectedTab === 0 ? this.documentsAvailable.length : this.selectedTab === 1 ? this.documentsScheduled.length : this.documentsInProgress.length) + " documents " + status;
  }

  openDocumentForm(doc?: number) {
    this.subs.push(this.dialog.openDocumentForm({ contentId: this.contentId, docId: doc }).subscribe(doc => {
      this.loadDocuments(doc);
    }));
  }

  onTabChange(event) {
    this.setTotalDocuments(event.tab.textLabel.toLowerCase());
  }
}
