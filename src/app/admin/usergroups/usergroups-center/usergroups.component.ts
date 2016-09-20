import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UsergroupsService, UsergroupData } from '../../../db-services/usergroups.service';

@Component({
  selector: 'app-usergroups',
  templateUrl: 'usergroups.component.html',
  styleUrls: ['usergroups.component.css']
})
export class UsergroupsComponent implements OnInit, OnDestroy  {

  private usergroupsData: UsergroupData[];
  private subscription: Subscription;

  constructor(private usergroups: UsergroupsService) {
    this.subscription = this.usergroups.usergroupsDataState
      .subscribe((usergroupsData: UsergroupData[]) => {
        this.usergroupsData = usergroupsData;
      });
    this.usergroups.loadUsergroups();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
