import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';

import { UsergroupService } from '../../../db-services/usergroup.service';
import { DbGroupList } from '../../../db-models/organ';

@Component({
  selector: 'app-search-groups',
  templateUrl: './search-groups.component.html',
  styleUrls: ['./search-groups.component.css']
})
export class SearchGroupsComponent implements OnInit, OnDestroy {
  @Input() authorizedGroups: DbGroupList[];
  @Input() baseForm: FormGroup;

  private groupsFromDB: DbGroupList[];  // Keep all groups retrieved from DB
  private groups: DbGroupList[];        // Contain all groups showed on template (with/without filter)
  private tempGroups: DbGroupList[];   // Temporary array to gather results from filter

  groupSubscribe: Subscription;
  groupAutocomplete: boolean = false;

  groupSelector: FormGroup;
  groupsCtrl: FormControl;
  groupInputCtrl: FormControl;

  selectedGroups: FormControl;

  errorMsg: string = '';

  static AuthorizedGroupsNotEmpty(control: FormControl) {
    return control.value.length !== 0 ? null : { mustHaveGroups: true };
  }

  constructor(private ugs: UsergroupService, private fb: FormBuilder) { }

  ngOnInit() {
    this.groupInputCtrl = new FormControl('');
    this.groupsCtrl = new FormControl('');
    this.selectedGroups = new FormControl(this.authorizedGroups, SearchGroupsComponent.AuthorizedGroupsNotEmpty);

    this.groupSelector = this.fb.group({
      groupInput: this.groupInputCtrl,
      groups: this.groupsCtrl
    });

    this.baseForm.addControl('groups', this.selectedGroups);

    this.groupSubscribe = this.groupInputCtrl.valueChanges.debounceTime(300).distinctUntilChanged().subscribe(g => this.searchGroup(g));

    this.ugs.loadGroups().subscribe(groups => {
      this.groups = groups;
      this.groupsFromDB = groups;
    });
  }

  ngOnDestroy() {
    this.groupSubscribe.unsubscribe();
  }

  addGroup(event) {
    event.preventDefault();
    this.errorMsg = '';
    this.groupsFromDB.forEach(g => {
      if (g.grp_id === +this.groupsCtrl.value) {
        if (this.authorizedGroups.indexOf(g) === -1) {
          this.authorizedGroups.push(g);
          this.baseForm.controls['groups'].updateValueAndValidity();
        } else {
          this.errorMsg = 'This group is already inside the list';
        }
        return;
      }
    });
  }

  removeGroup(index) {
    this.errorMsg = '';
    this.authorizedGroups.splice(index, 1);
    this.baseForm.controls['groups'].updateValueAndValidity();
  }

  private searchGroup(value: string) {
    if (value.length < 3) {
      this.groups = this.groupsFromDB;
      this.groupAutocomplete = false;
      return;
    }
    this.tempGroups = [];
    this.groupAutocomplete = true;

    this.groupsFromDB.forEach(g => {
      let gname: string = g.grp_name;
      let orgname: string = g.org_name;
      if (gname.match(new RegExp(value, 'i')) || orgname.match(new RegExp(value, 'i'))) {
        this.tempGroups.push(g);
      }
    });
    this.groups = this.tempGroups;
  }
}
