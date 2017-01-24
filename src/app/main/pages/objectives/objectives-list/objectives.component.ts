import { UserData } from './../../../../data/user-data';
import { ObjectivesService } from './../../../../shared/objectives.service';
import { UserService } from './../../../../user.service';
import { ObjectiveJson } from './../../../../db-models/json';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DbMainmenu } from './../../../../db-models/portal';
import { DbTopic } from './../../../../db-models/organ';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.css']
})
export class ObjectivesComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];
  objectives: ObjectiveJson[];
  viewTopics: DbTopic[];
  viewId: number;

  private currentGrpId: number = null;
  private contentId: number = null;

  constructor(public objectivesService: ObjectivesService, private user: UserService, private r: ActivatedRoute) { }

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
        this.viewId = mainmenu.mme_id;
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
}
