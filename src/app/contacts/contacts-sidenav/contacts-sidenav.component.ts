import { ReduxService } from './../../services/utils/redux.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts-sidenav',
  templateUrl: './contacts-sidenav.component.html',
  styleUrls: ['./contacts-sidenav.component.css']
})
export class ContactsSidenavComponent implements OnInit {

  constructor(private events: ReduxService) { }

  ngOnInit() {
  }

  public onclick() {
    this.events.sidenavClicked();
  }

}
