import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { <%= classifiedModuleName %>Service } from '../<%= dasherizedModuleName %>.service';

@Component({
  selector: '<%= selector %>-list',
  templateUrl: './<%= dasherizedModuleName %>-list.component.html',
  styleUrls: ['./<%= dasherizedModuleName %>-list.component.<%= styleExt %>']
})
export class <%= classifiedModuleName %>ListComponent implements OnInit, OnDestroy {

  public <%= camelizedModuleName %>Data: Observable<any[]> = null;

  public sub: Subscription;
  public selectedId: number;

  constructor(private route: ActivatedRoute, private service: <%= classifiedModuleName %>Service) {
    this.<%= camelizedModuleName %>Data = this.service.load<%= classifiedModuleName %>();
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

  isSelected(<%= camelizedModuleName %>: any): boolean {
    return <%= camelizedModuleName %>.id === this.selectedId;
  }
}
