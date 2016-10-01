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

  public elements: Observable<any[]> = null;

  public sub: Subscription;
  public selectedId: number;

  constructor(private route: ActivatedRoute, private service: <%= classifiedModuleName %>Service) {
    this.elements = this.service.loadAll();
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

  isSelected(element: any): boolean {
    return element.id === this.selectedId;
  }
}
