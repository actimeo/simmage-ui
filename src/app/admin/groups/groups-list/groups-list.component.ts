import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { GroupService } from '../group.service';
import { DbGroup } from '../../../db-models/organ';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit, OnDestroy {

  public groupsData: Observable<DbGroup[]> = null;

  public sub: Subscription;
  public selectedId: number;

  constructor(private gs: GroupService, private route: ActivatedRoute) {
    this.groupsData = this.gs.loadGroups();
  }

  ngOnInit() {
    this.sub = this.route.params
      .filter(params => !isNaN(params['selid']))
      .subscribe(params => {
        this.selectedId = +params['selid'];
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  isSelected(group: DbGroup): boolean {
    return group.grp_id === this.selectedId;
  }

}
