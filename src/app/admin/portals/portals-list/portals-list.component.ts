import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { PortalsService } from '../../../shared/portals.service';
import { DbPortal } from '../../../db-models/portal';

@Component({
  selector: 'app-portals-list',
  templateUrl: './portals-list.component.html',
  styleUrls: ['./portals-list.component.css']
})
export class PortalsListComponent implements OnInit, OnDestroy {

  public portalsData: Observable<DbPortal[]> = null;

  public sub: Subscription;
  public selectedId: number;

  constructor(private portals: PortalsService, private route: ActivatedRoute) {
    this.portalsData = this.portals.loadPortals();
  }

  ngOnInit() {
    this.sub = this.route.params
      .filter(params => !isNaN(params['selid']))
      .subscribe(params => {
        this.selectedId = +params['selid'];
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  isSelected(portal: DbPortal): boolean {
    return portal.por_id === this.selectedId;
  }

}
