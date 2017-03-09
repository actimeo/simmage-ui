import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { GroupService } from '../group.service';
import { DbGroup } from '../../../services/backend/db-models/organ';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {

  public groupsData: Observable<DbGroup[]> = null;

  public selectedId: Observable<number>;

  constructor(private gs: GroupService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.selectedId = this.route.params.pluck('selid');
    this.groupsData = this.route.data.pluck('list');
  }
}
