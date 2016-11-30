import { UserData } from './../../../../data/user-data';
import { UserService } from './../../../../user.service';
import { Subscription } from 'rxjs/Subscription';
import { DocumentJson } from './../../../../db-models/json';
import { Observable } from 'rxjs/Observable';
import { DocumentsService } from './../../../../shared/documents.service';
import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DbMainmenu } from './../../../../db-models/portal';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit, OnChanges, OnDestroy {

  private subs: Subscription[] = [];
  documents: Observable<DocumentJson[]>;
  private currentGrpId: number = null;
  private contentId: number;

  constructor(public documentsService: DocumentsService, private user: UserService, private r: ActivatedRoute ) { }

  ngOnInit() {

    this.subs.push(this.user.userDataState
      .map((u: UserData) => u.selectedGrpId)
      .distinctUntilChanged()
      .subscribe(grpId => {
        this.currentGrpId = grpId > 0 ? grpId : null;
      }));

    this.subs.push(this.r.data.pluck<DbMainmenu>('data').distinctUntilChanged().subscribe(data => {
      this.contentId = data.mme_content_id;
      this.documents = this.documentsService.loadDocumentsInView(this.contentId, this.currentGrpId);
    }));
  }

  ngOnChanges() {
    this.documents = this.documentsService.loadDocumentsInView(this.contentId, this.currentGrpId);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
