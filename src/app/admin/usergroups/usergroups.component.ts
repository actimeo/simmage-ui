import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UsergroupsService, UsergroupData } from '../../db-services/usergroups.service';

@Component({
  selector: 'app-usergroups',
  templateUrl: 'usergroups.component.html',
  styleUrls: ['usergroups.component.css']
})
export class UsergroupsComponent implements OnInit {

  private usergroupsData: Observable<UsergroupData[]> = null;

  constructor(private usergroups: UsergroupsService) {
    this.usergroupsData = this.usergroups.usergroupsDataState;
  }

  ngOnInit() {
  }

}
