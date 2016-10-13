import { Component, Input, OnInit } from '@angular/core';

import { DbOrganization } from '../../db-models/organ';

@Component({
  selector: 'app-organ-label',
  templateUrl: './organ-label.component.html',
  styleUrls: ['./organ-label.component.css']
})
export class OrganLabelComponent implements OnInit {

  @Input() organ: DbOrganization;

  constructor() { }

  ngOnInit() {
  }

}
