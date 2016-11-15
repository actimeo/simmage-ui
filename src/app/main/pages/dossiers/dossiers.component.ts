import { Component, OnInit, Input } from '@angular/core';

import { DbMainmenu } from './../../../db-models/portal';

@Component({
  selector: 'app-dossiers',
  templateUrl: './dossiers.component.html',
  styleUrls: ['./dossiers.component.css']
})
export class DossiersComponent implements OnInit {

  @Input() mainmenu: DbMainmenu;

  constructor() { }

  ngOnInit() {
  }

}
