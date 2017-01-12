import { UserData } from './../../../../data/user-data';
import { UserService } from './../../../../user.service';
import { Subscription } from 'rxjs/Subscription';
import { DocumentJson } from './../../../../db-models/json';
import { Observable } from 'rxjs/Observable';
import { DocumentsService } from './../../../../shared/documents.service';
import { Component, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DbMainmenu } from './../../../../db-models/portal';
import { DbTopic } from './../../../../db-models/organ';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];
  public documents: DocumentJson[];
  viewTopics: DbTopic[];

  private currentGrpId: number = null;
  private contentId: number = null;

  constructor(public documentsService: DocumentsService, private user: UserService, private r: ActivatedRoute) { }

  ngOnInit() {
    // Listen for group change
    this.subs.push(this.user.userDataState
      .map((u: UserData) => u.selectedGrpId)
      .distinctUntilChanged()
      .subscribe(grpId => {
        this.currentGrpId = grpId > 0 ? grpId : null;
        this.loadDocuments();
      }));

    // Listen for mainmenu change
    this.subs.push(this.r.data.pluck('data')
      .distinctUntilChanged().subscribe((data: DbMainmenu) => {
        this.contentId = data.mme_content_id;
        this.subs.push(this.documentsService.loadViewTopics(this.contentId)
          .subscribe(data => this.viewTopics = data));
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

}
