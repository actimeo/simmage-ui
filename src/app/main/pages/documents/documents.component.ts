import { Component, OnInit, Input } from '@angular/core';

import { DbMainmenu } from './../../../db-models/portal';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  @Input() mainmenu: DbMainmenu;

  constructor() { }

  ngOnInit() {
  }

}
