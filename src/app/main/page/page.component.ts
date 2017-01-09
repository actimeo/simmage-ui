import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { DbMainmenu } from './../../db-models/portal';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  private mainmenu: Observable<DbMainmenu>;

  constructor(private r: ActivatedRoute) {
  }

  ngOnInit() {
    this.mainmenu = this.r.data.pluck('data');
  }
}
