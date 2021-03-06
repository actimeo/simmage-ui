import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { UsergroupsService } from '../usergroups.service';
import { UsergroupJson } from '../../../services/backend/db-models/json';

@Component({
  selector: 'app-usergroups-list',
  templateUrl: './usergroups-list.component.html',
  styleUrls: ['./usergroups-list.component.css']
})
export class UsergroupsListComponent implements OnInit {

  public usergroupsData: Observable<UsergroupJson[]>;
  public selectedId: Observable<number>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.usergroupsData = this.route.data.pluck('list');
    this.selectedId = this.route.params.pluck('selid');
  }
}
