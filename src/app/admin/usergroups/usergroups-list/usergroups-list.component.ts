import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

import { UsergroupsService, UsergroupData } from '../usergroups.service';


@Component({
  selector: 'app-usergroups-list',
  templateUrl: './usergroups-list.component.html',
  styleUrls: ['./usergroups-list.component.css']
})
export class UsergroupsListComponent implements OnInit, OnDestroy {

  private usergroupsData: UsergroupData[];
  private ugrSubscription: Subscription;

  public paramSub: Subscription;
  public selectedId: number;

  constructor(private usergroups: UsergroupsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.ugrSubscription = this.usergroups.usergroupsDataState
      .subscribe((usergroupsData: UsergroupData[]) => {
        this.usergroupsData = usergroupsData;
      });
    this.usergroups.loadUsergroups();

    this.paramSub = this.route.params
    .filter(params => !isNaN(params['selid']))
    .subscribe(params => {
      this.selectedId = +params['selid'];
    });
  }

  ngOnDestroy() {
    this.ugrSubscription.unsubscribe();
    this.paramSub.unsubscribe();
  }

  isSelected(usergroupId: number): boolean {
    return usergroupId === this.selectedId;
  }

}
