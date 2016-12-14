import { UserData } from './../../../../data/user-data';
import { ObjectivesService } from './../../../../shared/objectives.service';
import { UserService } from './../../../../user.service';
import { ObjectiveJson } from './../../../../db-models/json';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DbMainmenu } from './../../../../db-models/portal';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.css']
})
export class ObjectivesComponent implements OnInit, OnChanges, OnDestroy {

  private subs: Subscription[] = [];
  objectives: Observable<ObjectiveJson[]>;
  private currentGrpId: number = null;
  private contentId: number;
  private viewId: number;

  constructor(public objectivesService: ObjectivesService, private user: UserService, private r: ActivatedRoute) { }

  ngOnInit() {

    this.subs.push(this.user.userDataState
      .map((u: UserData) => u.selectedGrpId)
      .distinctUntilChanged()
      .subscribe(grpId => {
        this.currentGrpId = grpId > 0 ? grpId : null;
      }));
    this.subs.push(this.r.data.pluck<DbMainmenu>('data').distinctUntilChanged().subscribe(data => {
      this.viewId = data.mme_id;
      this.contentId = data.mme_content_id;
      this.objectives = this.objectivesService.loadObjectivesInView(this.contentId, this.currentGrpId);
    }));
  }

  ngOnChanges(changes: SimpleChanges) {
    this.objectives = this.objectivesService.loadObjectivesInView(this.contentId, this.currentGrpId);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
