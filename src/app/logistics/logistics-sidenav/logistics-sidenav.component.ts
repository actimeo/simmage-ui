import { ReduxService } from './../../services/utils/redux.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logistics-sidenav',
  templateUrl: './logistics-sidenav.component.html',
  styleUrls: ['./logistics-sidenav.component.css']
})
export class LogisticsSidenavComponent implements OnInit {

  constructor(private events: ReduxService) { }

  ngOnInit() {
  }

  public onclick() {
    this.events.sidenavClicked();
  }
}
