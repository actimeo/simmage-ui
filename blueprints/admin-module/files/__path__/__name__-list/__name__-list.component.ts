import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Db<%= classifiedModuleName %> } from '../<%= dasherizedModuleName %>.service';

@Component({
  selector: '<%= selector %>-list',
  templateUrl: './<%= dasherizedModuleName %>-list.component.html',
  styleUrls: ['./<%= dasherizedModuleName %>-list.component.<%= styleExt %>']
})
export class <%= classifiedModuleName %>ListComponent implements OnInit {

  public <%= camelizedModuleName %>Data: Observable<any[]>;

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.<%= camelizedModuleName %>Data = this.route.data.pluck<Db<%= classifiedModuleName %>[]>('list');
    this.route.params.pluck<number>('selid');
  }
}
