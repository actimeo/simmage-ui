import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { DbPortal } from '../../../db-models/portal';

@Component({
  selector: 'app-portals-list',
  templateUrl: './portals-list.component.html',
  styleUrls: ['./portals-list.component.css']
})
export class PortalsListComponent implements OnInit {

  public portalsData: Observable<DbPortal[]>;
  public selectedId: Observable<number>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.portalsData = this.route.data.pluck('list');
    this.selectedId = this.route.params.pluck('selid');
  }
}
