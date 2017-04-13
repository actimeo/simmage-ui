import { UserData } from './../../../data/user-data';
import { ObjectivesService } from './../../../services/backend/objectives.service';
import { UserService } from './../../../services/utils/user.service';
import { FormsDialogService } from './../../../services/utils/forms-dialog.service';
import { ObjectiveJson } from './../../../services/backend/db-models/json';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DbMainmenu } from './../../../services/backend/db-models/portal';
import { DbTopic } from './../../../services/backend/db-models/organ';
import { EnumsService } from './../../../services/backend/enums.service';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.css']
})
export class ObjectivesComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];
  objectives: ObjectiveJson[];
  objectivesFiltered: any[] = [];
  objectivesStatuses: string[];
  viewTopics: DbTopic[];
  viewTitle: string;

  selectedTab: number = 0;

  totalObjectives: string;

  private currentGrpId: number = null;
  private contentId: number = null;

  constructor(public objectivesService: ObjectivesService, private user: UserService,
              private r: ActivatedRoute, private dialog: FormsDialogService, private es: EnumsService) { }

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

    const statuses$ = this.es.enum_list('objectives/objective_status')
      .do((statuses: string[]) => {
        this.objectivesStatuses = statuses;
      });

    this.subs.push(Observable.combineLatest(grpId$, mainmenu$, statuses$)
      .subscribe(([grpId, mainmenu, statuses]: [number, DbMainmenu, string[]]) => {
        this.loadResources();
      }));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private loadResources(objId = null) {
    this.subs.push(this.objectivesService.loadObjectivesInView(this.contentId, this.currentGrpId)
      .subscribe(data => {
        this.objectivesFiltered = [];
        this.objectivesStatuses.forEach(status => {
          this.objectivesFiltered.push({
            status: status[0].toUpperCase() + status.slice(1),
            objectives: data.filter(obj => obj.obj_status === status)
          });
        });

        let objStatus = this.objectivesStatuses[0];

        if (objId !== null) {
          objStatus = data.find(o => o.obj_id === objId).obj_status;
          this.selectedTab = this.objectivesStatuses.findIndex(os => os === objStatus);
        }

        this.setTotalObjectives(objStatus[0].toUpperCase() + objStatus.slice(1));
      }));
  }

  openObjectiveForm(obj?: number) {
    this.subs.push(this.dialog.openObjectiveForm({ contentId: this.contentId, objId: obj }).subscribe(obj => {
      this.loadResources(obj);
    }));
  }

  onTabChange(event) {
    this.setTotalObjectives(event.tab.textLabel);
  }

  setTotalObjectives(status) {
    this.totalObjectives = (this.objectivesFiltered.find(object => object.status === status) ? this.objectivesFiltered.find(object => object.status === status).objectives.length : '0') + ' objective(s) ' + status.toLowerCase();
  }
}
