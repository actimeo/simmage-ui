import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { OrgansService } from '../organs.service';
import { DbOrganization } from '../../../db-models/organ';

@Component({
  selector: 'app-organs-list',
  templateUrl: './organs-list.component.html',
  styleUrls: ['./organs-list.component.css']
})
export class OrgansListComponent implements OnInit, OnDestroy {

  public organsExternalData: Observable<DbOrganization[]> = null;
  public organsInternalData: Observable<DbOrganization[]> = null;

  public sub: Subscription;
  public selectedId: number;

  constructor(private organs: OrgansService, private route: ActivatedRoute) {
    this.organsExternalData = this.organs.organsExternalState;
    this.organsInternalData = this.organs.organsInternalState;
  }

  ngOnInit() {
    this.sub = this.route.params
    .filter(params => !isNaN(params['selid']))
    .subscribe(params => {
      this.selectedId = +params['selid'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  isSelected(organ: DbOrganization): boolean {
    return organ.org_id === this.selectedId;
  }

}
