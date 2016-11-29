import { UserData } from './../../../data/user-data';
import { UserService } from './../../../user.service';
import { ResourcesService } from './../../../shared/resources.service';
import { ResourceJson } from './../../../db-models/json';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { DbMainmenu } from './../../../db-models/portal';
import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit, OnChanges, OnDestroy {

  @Input() mainmenu: DbMainmenu;

  private subs: Subscription[] = [];
  resources: Observable<ResourceJson[]>;
  private currentGrpId: number = null;

  constructor(public resourcesService: ResourcesService, private user: UserService) { }

  ngOnInit() {
    this.subs.push(this.user.userDataState
      .map((u: UserData) => u.selectedGrpId)
      .distinctUntilChanged()
      .subscribe(grpId => {
        this.currentGrpId = grpId > 0 ? grpId : null;
        this.loadResources();
      }));
  }

  ngOnChanges() {
    this.loadResources();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  loadResources() {
    this.resources = this.resourcesService.loadResourcesInView(this.mainmenu.mme_content_id, this.currentGrpId);
  }

}
