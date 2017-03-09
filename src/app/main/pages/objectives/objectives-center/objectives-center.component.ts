import { ObjectivesService } from './../../../../services/backend/objectives.service';
import { Component, OnInit, OnChanges, OnDestroy, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { DbMainmenu } from './../../../../services/backend/db-models/portal';

@Component({
  selector: 'app-objectives-center',
  templateUrl: './objectives-center.component.html',
  styleUrls: ['./objectives-center.component.css']
})
export class ObjectivesCenterComponent implements OnInit {

  public mainmenu: Observable<DbMainmenu>;

  constructor(public objectivesService: ObjectivesService, private r: ActivatedRoute) { }

  ngOnInit() {
    this.mainmenu = this.r.data.pluck('data');
  }
}
