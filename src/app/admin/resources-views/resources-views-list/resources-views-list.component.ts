import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import '../../../rxjs_operators';

import { DbResourcesviewGet } from '../../../db-models/resources';

@Component({
  selector: 'app-resources-views-list',
  templateUrl: './resources-views-list.component.html',
  styleUrls: ['./resources-views-list.component.css']
})
export class ResourcesViewsListComponent implements OnInit {

  public resourcesViewsData: Observable<any[]>;
  public selectedId: Observable<number>;

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.resourcesViewsData = this.route.data.pluck('list');
    this.selectedId = this.route.params.pluck('selid');
  }
}
