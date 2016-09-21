import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/fromEvent';

import { UsergroupService } from '../../../db-services/usergroup.service';
import { DbUsergroup } from '../../../db-models/login';
import { DbGroup } from '../../../db-models/organ';
import { DbPortal } from '../../../db-models/portal';
import { CanComponentDeactivate } from '../../../guards/can-deactivate.guard';

@Component({
  selector: 'app-usergroup',
  templateUrl: './usergroup.component.html',
  styleUrls: ['./usergroup.component.css']
})
export class UsergroupComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  private groups: DbGroup[];
  private autocompleteGroups: DbGroup[];
  private portals: DbPortal[];

  id: number;
  creatingNew: boolean = false;

  form: FormGroup;
  nameCtrl: FormControl;
  groupsCtrl: FormControl;
  groupInputCtrl: FormControl;
  portalsCtrl: FormControl;
  portalInputCtrl: FormControl;

  portalAutocomplete: boolean = false;
  groupAutocomplete: boolean = false;

  originalData: DbUsergroup = { ugr_id: null, ugr_name: null };
  pleaseSave: boolean = false;

  errorMsg: string = '';
  errorDetails: string = '';

  constructor(private route: ActivatedRoute, private router: Router,
    private fb: FormBuilder, private ugs: UsergroupService, private ngZone: NgZone) { }

  ngOnInit() {
    this.nameCtrl = new FormControl('', Validators.required);
    this.groupsCtrl = new FormControl('');
    this.portalsCtrl = new FormControl('');
    this.groupInputCtrl = new FormControl('');
    this.portalInputCtrl = new FormControl('');
    this.form = this.fb.group({
      name: this.nameCtrl,
      groups: this.groupsCtrl,
      portals: this.portalsCtrl,
      groupInput: this.groupInputCtrl,
      portalInput: this.portalInputCtrl
    });

    this.route.data.forEach((data: { usergroup: DbUsergroup}) => {
      if ('usergroup' in data) {
        this.id = data.usergroup.ugr_id;
        this.creatingNew = false;
        this.nameCtrl.setValue(data.usergroup.ugr_name);
      } else {
        this.creatingNew = true;
        this.nameCtrl.setValue('');
      }
      this.setOriginalDataFromFields();
      this.errorDetails = '';
      this.errorMsg = '';
      this.ugs.loadGroups().subscribe(groups => this.groups = groups);
      this.ugs.loadPortals().subscribe(portals => this.portals = portals);
    });

    this.groupAutocomplete = false;

    this.groupInputCtrl.valueChanges.debounceTime(300).distinctUntilChanged().subscribe(x => this.searchGroup(x));
  }

  ngOnDestroy() {

  }

  addGroup(event) {
    event.preventDefault();
    console.log(this.groupsCtrl.value);
  }

  addPortal(event) {
    event.preventDefault();
    console.log(this.portalsCtrl.value);
  }

  private searchGroup(value: string) {
    this.autocompleteGroups = [];
    this.groupAutocomplete = false;

    if (value.length < 3) {
      return;
    }

    this.groups.forEach(g => {
      let gname: string = g.grp_name;
      if (gname.match(new RegExp(value, 'i'))) {
        this.autocompleteGroups.push(g);
        this.groupAutocomplete = true;
      }
    });
  }

  searchPortal(event) {
    console.log(event.target.value);
  }

  canDeactivate() {
    if (this.originalDataChanged()) {
      this.pleaseSave = true;
      return false;
    } else {
      return true;
    }
  }

  private setOriginalDataFromFields() {
    this.originalData.ugr_name = this.nameCtrl.value;
  }

  private originalDataChanged() {
    return this.originalData.ugr_name !== this.nameCtrl.value;
  }

}
