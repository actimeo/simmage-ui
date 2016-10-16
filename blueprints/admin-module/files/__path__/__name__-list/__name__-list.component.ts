import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { <%= classifiedModuleName %>Service } from '../<%= dasherizedModuleName %>.service';

@Component({
  selector: '<%= selector %>-list',
  templateUrl: './<%= dasherizedModuleName %>-list.component.html',
  styleUrls: ['./<%= dasherizedModuleName %>-list.component.<%= styleExt %>']
})
export class <%= classifiedModuleName %>ListComponent implements OnInit, OnDestroy {

  public <%= camelizedModuleName %>Data: Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private service: <%= classifiedModuleName %>Service) { }

  ngOnInit() {
    this.<%= camelizedModuleName %>Data = this.service.load<%= classifiedModuleName %>();
    this.route.params.pluck<number>('selid');
  }
}
