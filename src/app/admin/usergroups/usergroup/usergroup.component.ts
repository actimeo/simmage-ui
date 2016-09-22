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

  private authorizedGroups: DbGroupList[] = [];
  private authorizedPortals: DbPortal[] = [];

  id: number;
  creatingNew: boolean = false;

  form: FormGroup;
  nameCtrl: FormControl;

  originalData: DbUsergroup = { ugr_id: null, ugr_name: null };
  pleaseSave: boolean = false;

  errorMsg: string = '';
  errorDetails: string = '';

  constructor(private route: ActivatedRoute, private router: Router,
    private fb: FormBuilder, private ugs: UsergroupService) { }

  ngOnInit() {
    this.nameCtrl = new FormControl('', Validators.required);
    this.form = this.fb.group({
      name: this.nameCtrl
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
  }

  ngOnDestroy() {
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
