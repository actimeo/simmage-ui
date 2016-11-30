import { UserData } from './../../../data/user-data';
import { ObjectivesService } from './../../../shared/objectives.service';
import { UserService } from './../../../user.service';
import { ObjectiveJson } from './../../../db-models/json';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';

import { DbMainmenu } from './../../../db-models/portal';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.css']
})
export class ObjectivesComponent implements OnInit, OnChanges, OnDestroy {

  @Input() mainmenu: DbMainmenu;

  private subs: Subscription[] = [];
  objectives: Observable<ObjectiveJson[]>;
  private currentGrpId: number = null;
  private viewTopics: string[];

  constructor(public objectivesService: ObjectivesService, private user: UserService) { }

  ngOnInit() {
    this.subs.push(this.user.userDataState
      .map((u: UserData) => u.selectedGrpId)
      .distinctUntilChanged()
      .subscribe(grpId => {
        this.currentGrpId = grpId > 0 ? grpId : null;
        this.loadObjectives();
      }));
    this.objectivesService.loadViewTopics(this.mainmenu.mme_content_id).subscribe(topics => this.viewTopics = topics);
  }

  ngOnChanges() {
    this.loadObjectives();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  loadObjectives() {
    this.objectives = this.objectivesService.loadObjectivesInView(this.mainmenu.mme_content_id, this.currentGrpId);
  }
}
