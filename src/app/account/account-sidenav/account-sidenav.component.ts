import { ReduxService } from './../../services/utils/redux.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-sidenav',
  templateUrl: './account-sidenav.component.html',
  styleUrls: ['./account-sidenav.component.css']
})
export class AccountSidenavComponent implements OnInit {

  constructor(private events: ReduxService) { }

  ngOnInit() {
  }

  public onclick() {
    this.events.sidenavClicked();
  }
}
