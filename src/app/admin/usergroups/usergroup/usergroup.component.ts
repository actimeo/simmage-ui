import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';

import { UsergroupService } from '../../../db-services/usergroup.service';
import { DbUsergroup } from '../../../db-models/login';
import { DbGroupList } from '../../../db-models/organ';
import { DbPortal } from '../../../db-models/portal';
import { CanComponentDeactivate } from '../../../guards/can-deactivate.guard';

@Component({
  selector: 'app-usergroup',
  templateUrl: './usergroup.component.html',
  styleUrls: ['./usergroup.component.css']
})
export class UsergroupComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  private authorizedGroups: number[] = [];
  private authorizedPortals: number[] = [];

  groupsData: any[] = [];
  portalsData: any[] = [];

  id: number;
  creatingNew: boolean = false;

  form: FormGroup;
  nameCtrl: FormControl;
  groupsCtrl: FormControl;
  portalsCtrl: FormControl;

  originalData: DbUsergroup = { ugr_id: null, ugr_name: null };
  pleaseSave: boolean = false;

  errorMsg: string = '';
  errorDetails: string = '';

  static elementsNotEmpty(control: FormControl) {
    return control.value.length !== 0 ? null : { mustContainValues: true };
  }

  constructor(private route: ActivatedRoute, private router: Router,
    private fb: FormBuilder, private ugs: UsergroupService) { }

  ngOnInit() {
    this.nameCtrl = new FormControl('', Validators.required);
    this.groupsCtrl = new FormControl(this.authorizedGroups, UsergroupComponent.elementsNotEmpty);
    this.portalsCtrl = new FormControl(this.authorizedPortals, UsergroupComponent.elementsNotEmpty);
    this.form = this.fb.group({
      name: this.nameCtrl,
      groups: this.groupsCtrl,
      portals: this.portalsCtrl
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
    });

    this.ugs.loadGroups().subscribe(groups => {
      groups.forEach(g => {
        this.groupsData.push({ id: g.grp_id, name: g.org_name + ' - ' + g.grp_name });
      });
    });

    this.ugs.loadPortals().subscribe(portals => {
      portals.forEach(p => {
        this.portalsData.push({ id: p.por_id, name: p.por_name });
      });
    });
  }

  ngOnDestroy() {
  }

  onSubmit() {
    
  }

  checkGroups(elements: number[]) {
    this.groupsCtrl.setValue(elements);
    this.form.controls['groups'].updateValueAndValidity();
  }

  checkPortals(elements: number[]) {
    this.portalsCtrl.setValue(elements);
    this.form.controls['portals'].updateValueAndValidity();
  }

  doCancel() {
    this.setOriginalDataFromFields();
    this.goBackToList();
  }

  doDelete() {
    this.setOriginalDataFromFields();
    // todo : call service to delete an usergroup
  }

  private goBackToList(withSelected = false) {
    if (withSelected) {
      this.router.navigate(['/admin/organs', { selid: this.id }]);
    } else {
      this.router.navigate(['/admin/organs']);
    }
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
