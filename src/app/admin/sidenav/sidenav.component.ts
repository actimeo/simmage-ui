import { ReduxService } from './../../services/utils/redux.service';
import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/utils/user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  constructor(public user: UserService, private events: ReduxService) {
  }

  ngOnInit() {
  }

  onclick() {
    this.events.sidenavClicked();
  }
}
