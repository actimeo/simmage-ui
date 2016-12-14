import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import '../../../rxjs_operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  private selectedId: Observable<number>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.selectedId = this.route.params.pluck<number>('selusergroup');
  }

}
