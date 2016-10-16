import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import '../../../rxjs_operators';

import { OrganListData } from '../organ-list-resolve.guard';

@Component({
  selector: 'app-organs-list',
  templateUrl: './organs-list.component.html',
  styleUrls: ['./organs-list.component.css']
})
export class OrgansListComponent implements OnInit {

  public selectedId: Observable<number>;
  public organListData: Observable<OrganListData>;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.selectedId = this.route.params.pluck<number>('selid');
    this.organListData = this.route.data.pluck<OrganListData>('list');
  }
}
