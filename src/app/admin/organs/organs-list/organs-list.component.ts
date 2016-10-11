import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import '../../../rxjs_operators';

import { OrganService } from '../../../shared/organ.service';
import { DbOrganization } from '../../../db-models/organ';

@Component({
  selector: 'app-organs-list',
  templateUrl: './organs-list.component.html',
  styleUrls: ['./organs-list.component.css']
})
export class OrgansListComponent implements OnInit {

  public organsExternalData: Observable<DbOrganization[]> = null;
  public organsInternalData: Observable<DbOrganization[]> = null;

  public selectedId: Observable<number>;

  constructor(private organs: OrganService, private route: ActivatedRoute) {
    this.organsExternalData = this.organs.loadOrganizations(false);
    this.organsInternalData = this.organs.loadOrganizations(true);
  }

  ngOnInit() {
    this.selectedId = this.route.params.pluck<number>('selid');
  }
}
