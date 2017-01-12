import { UserData } from './../../../../data/user-data';
import { UserService } from './../../../../user.service';
import { ResourcesService } from './../../../../shared/resources.service';
import { ResourceJson } from './../../../../db-models/json';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DbMainmenu } from './../../../../db-models/portal';
import { DbTopic } from './../../../../db-models/organ';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];
  resources: ResourceJson[];
  viewTopics: DbTopic[];

  private currentGrpId: number = null;
  private contentId: number = null;

  constructor(public resourcesService: ResourcesService, private user: UserService, private r: ActivatedRoute) { }

  ngOnInit() {
    // Listen for group change
    this.subs.push(this.user.userDataState
      .map((u: UserData) => u.selectedGrpId)
      .distinctUntilChanged()
      .subscribe(grpId => {
        this.currentGrpId = grpId > 0 ? grpId : null;
        this.loadResources();
      }));

    // Listen for mainmenu change
    this.subs.push(this.r.data.pluck('data')
      .distinctUntilChanged().subscribe((data: DbMainmenu) => {
        this.contentId = data.mme_content_id;
        this.subs.push(this.resourcesService.loadViewTopics(this.contentId)
          .subscribe(data => this.viewTopics = data));
        this.loadResources();
      }));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private loadResources() {
    this.subs.push(this.resourcesService.loadResourcesInView(this.contentId, this.currentGrpId)
    .subscribe(data => this.resources = data));
  }
}
