import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { GroupService } from '../group.service';
import { DbGroup } from '../../../db-models/organ';
import { CanComponentDeactivate } from '../../../guards/can-deactivate.guard';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, CanComponentDeactivate {

  id: number;
  creatingNew: boolean = false;

  form: FormGroup;
  nameCtrl: FormControl;

  originalData: DbGroup = { 
    grp_id: null,
    grp_name: null,
    grp_description: null,
    grp_mandatory: null,
    grp_orientation: null,
    org_id: null
  };
  pleaseSave: boolean = false;

  errorMsg: string = '';
  errorDetails: string = '';

  constructor(private route: ActivatedRoute, public router: Router,
    private fb: FormBuilder, private gs: GroupService) { }

  ngOnInit() {

  }

}
