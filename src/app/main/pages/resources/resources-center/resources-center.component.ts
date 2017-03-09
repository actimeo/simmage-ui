import { ResourcesService } from './../../../../services/backend/resources.service';
import { Component, OnInit, OnChanges, OnDestroy, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { DbMainmenu } from './../../../../services/backend/db-models/portal';

@Component({
  selector: 'app-resources-center',
  templateUrl: './resources-center.component.html',
  styleUrls: ['./resources-center.component.css']
})
export class ResourcesCenterComponent implements OnInit {

  public mainmenu: Observable<DbMainmenu>;

  constructor(public resourcesService: ResourcesService, private r: ActivatedRoute) { }

  ngOnInit() {
    this.mainmenu = this.r.data.pluck('data');
  }
}
