import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UsergroupsService, UsergroupData } from '../../../db-services/usergroups.service';


@Component({
  selector: 'app-usergroups-list',
  templateUrl: './usergroups-list.component.html',
  styleUrls: ['./usergroups-list.component.css']
})
export class UsergroupsListComponent implements OnInit, OnDestroy {

  private usergroupsData: UsergroupData[];
  private subscription: Subscription;

  constructor(private usergroups: UsergroupsService) { }

  ngOnInit() {
    this.subscription = this.usergroups.usergroupsDataState
      .subscribe((usergroupsData: UsergroupData[]) => {
        this.usergroupsData = usergroupsData;
      });
    this.usergroups.loadUsergroups();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
