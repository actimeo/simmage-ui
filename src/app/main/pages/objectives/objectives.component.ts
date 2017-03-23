import { UserData } from './../../../data/user-data';
import { ObjectivesService } from './../../../services/backend/objectives.service';
import { UserService } from './../../../services/utils/user.service';
import { FormsDialogService } from './../../../services/utils/forms-dialog.service';
import { ObjectiveJson } from './../../../services/backend/db-models/json';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DbMainmenu } from './../../../services/backend/db-models/portal';
import { DbTopic } from './../../../services/backend/db-models/organ';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.css']
})
export class ObjectivesComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];
  objectives: ObjectiveJson[];
  viewTopics: DbTopic[];
  viewTitle: string;

  private currentGrpId: number = null;
  private contentId: number = null;

  constructor(public objectivesService: ObjectivesService, private user: UserService,
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
        this.subs.push(this.objectivesService.loadViewTopics(this.contentId)
          .subscribe(data => this.viewTopics = data));
      });

    this.subs.push(Observable.combineLatest(grpId$, mainmenu$)
      .subscribe(([grpId, mainmenu]: [number, DbMainmenu]) => {
        this.loadResources();
      }));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private loadResources() {
    this.subs.push(this.objectivesService.loadObjectivesInView(this.contentId, this.currentGrpId)
      .subscribe(data => this.objectives = data));
  }

  openObjectiveForm(obj?: number) {
    this.subs.push(this.dialog.openObjectiveForm({ contentId: this.contentId, objId: obj }).subscribe(doc => {
      this.loadResources();
    }));
  }
}
