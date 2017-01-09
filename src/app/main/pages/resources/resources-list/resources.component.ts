import { UserData } from './../../../../data/user-data';
import { UserService } from './../../../../user.service';
import { ResourcesService } from './../../../../shared/resources.service';
import { ResourceJson } from './../../../../db-models/json';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { DbMainmenu } from './../../../../db-models/portal';
import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit, OnChanges, OnDestroy {

  private subs: Subscription[] = [];
  resources: Observable<ResourceJson[]>;
  private currentGrpId: number = null;
  private contentId: number;
  private viewId: number;

  constructor(public resourcesService: ResourcesService, private user: UserService, private r: ActivatedRoute) { }

  ngOnInit() {

    this.subs.push(this.user.userDataState
      .map((u: UserData) => u.selectedGrpId)
      .distinctUntilChanged()
      .subscribe(grpId => {
        this.currentGrpId = grpId > 0 ? grpId : null;
      }));
    this.subs.push(this.r.data.pluck('data')
      .distinctUntilChanged().subscribe((data: DbMainmenu) => {
        this.viewId = data.mme_id;
        this.contentId = data.mme_content_id;
        this.resources = this.resourcesService.loadResourcesInView(this.contentId, this.currentGrpId);
      }));
  }

  ngOnChanges(changes: SimpleChanges) {
    this.resources = this.resourcesService.loadResourcesInView(this.contentId, this.currentGrpId);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
