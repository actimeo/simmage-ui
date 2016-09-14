import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { OrgansService } from '../../../db-services/organs.service';
import { DbOrganization } from '../../../db-models/organ';

@Component({
  selector: 'app-organs',
  templateUrl: 'organs.component.html',
  styleUrls: ['organs.component.css']
})
export class OrgansComponent implements OnInit {

  private organsInternalData: Observable<DbOrganization[]> = null;
  private organsExternalData: Observable<DbOrganization[]> = null;

  constructor(private organs: OrgansService) {
        this.organsInternalData = this.organs.organsInternalState;
        this.organsExternalData = this.organs.organsExternalState;
   }

  ngOnInit() {
  }

}
