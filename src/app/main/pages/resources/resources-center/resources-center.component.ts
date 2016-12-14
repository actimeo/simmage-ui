import { ResourcesService } from './../../../../shared/resources.service';
import { Component, OnInit, OnChanges, OnDestroy, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { DbMainmenu } from './../../../../db-models/portal';
import { DbTopic } from './../../../../db-models/organ';

@Component({
  selector: 'app-resources-center',
  templateUrl: './resources-center.component.html',
  styleUrls: ['./resources-center.component.css']
})
export class ResourcesCenterComponent implements OnInit, OnChanges, OnDestroy {

  public viewTopics: Observable<DbTopic[]>;
  private idSub: Subscription;
  public mainmenu: Observable<DbMainmenu>;
  private contentId: number;

  constructor(public resourcesService: ResourcesService, private r: ActivatedRoute) { }

  ngOnInit() {
    this.mainmenu = this.r.data.pluck<DbMainmenu>('data');
    this.idSub = this.r.data.pluck<DbMainmenu>('data').distinctUntilChanged().subscribe(data => {
      this.contentId = data.mme_content_id;
      this.viewTopics = this.resourcesService.loadViewTopics(this.contentId);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.viewTopics = this.resourcesService.loadViewTopics(this.contentId);
  }

  ngOnDestroy() {
    if (this.idSub) {
      this.idSub.unsubscribe();
    }
  }
}
