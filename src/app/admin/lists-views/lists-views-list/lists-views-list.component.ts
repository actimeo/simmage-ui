import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import '../../../rxjs_operators';

import { DbListsviewList } from '../../../db-models/lists';

@Component({
  selector: 'app-lists-views-list',
  templateUrl: './lists-views-list.component.html',
  styleUrls: ['./lists-views-list.component.css']
})
export class ListsViewsListComponent implements OnInit {

  public listsViewsData: Observable<any[]>;
  public selectedId: Observable<number>;

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.listsViewsData = this.route.data.pluck<DbListsviewList[]>('list');
    this.selectedId = this.route.params.pluck<number>('selid');
  }
}
