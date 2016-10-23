import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { UsergroupsService, UsergroupData } from '../usergroups.service';


@Component({
  selector: 'app-usergroups-list',
  templateUrl: './usergroups-list.component.html',
  styleUrls: ['./usergroups-list.component.css']
})
export class UsergroupsListComponent implements OnInit, OnDestroy {

  public usergroupsData: UsergroupData[];
  public ugrSubscription: Subscription;

  public selectedId: Observable<number>;

  constructor(public usergroups: UsergroupsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.ugrSubscription = this.usergroups.usergroupsDataState
      .subscribe((usergroupsData: UsergroupData[]) => {
        this.usergroupsData = usergroupsData;
      });
    this.usergroups.loadUsergroups();

    this.selectedId = this.route.params.pluck<number>('selid').do(s => console.log(s));
  }

  ngOnDestroy() {
    this.ugrSubscription.unsubscribe();
  }
}
