import { Component, OnInit, Input } from '@angular/core';

import { DbMainmenu } from './../../../db-models/portal';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  @Input() mainmenu: DbMainmenu;

  constructor() { }

  ngOnInit() {
  }

}
