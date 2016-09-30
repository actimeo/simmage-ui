import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: '<%= selector %>-list',
  templateUrl: './<%= dasherizedModuleName %>-list.component.html',
  styleUrls: ['./<%= dasherizedModuleName %>-list.component.<%= styleExt %>']
})
export class <%= classifiedModuleName %>ListComponent implements OnInit, OnDestroy {

  public elements: Observable<any[]> = null;

  public sub: Subscription;
  public selectedId: number;

  constructor(private route: ActivatedRoute) {
    this.elements = Observable.of([{
	id: 1,
	name: 'element 1',
	description: 'description 1'
    }, {
	id: 2,
	name: 'element 2',
	description: 'description 2'
    }]);
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
