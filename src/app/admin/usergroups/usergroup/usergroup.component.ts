import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MdInput } from '@angular/material';

import '../../../rxjs_operators';

import { UsergroupJson } from '../../../db-models/json';
import { UsergroupsService } from '../usergroups.service';
import { CanComponentDeactivate } from '../../../guards/can-deactivate.guard';

@Component({
  selector: 'app-usergroup',
  templateUrl: './usergroup.component.html',
  styleUrls: ['./usergroup.component.css']
})
export class UsergroupComponent implements OnInit, CanComponentDeactivate {

  @ViewChild('getfocus') getfocus: MdInput;

  groupsData: any[] = [];
  portalsData: any[] = [];

  id: number;

  form: FormGroup;
  nameCtrl: FormControl;
  groupsCtrl: FormControl;
  portalsCtrl: FormControl;

  originalData: any = null;
  pleaseSave: boolean = false;

  errorMsg: string = '';
  errorDetails: string = '';

  static elementsNotEmpty(control: FormControl) {
    return control.value && control.value.length !== 0 ? null : { mustContainValues: true };
  }

  constructor(private route: ActivatedRoute, public router: Router,
    private fb: FormBuilder, public ugs: UsergroupsService) { }

  ngOnInit() {

    this.ugs.loadGroups().subscribe(groups => {
      this.groupsData = groups.map(g => ({ id: g.grp_id, name: g.org_name + ' - ' + g.grp_name }));
    });

    this.ugs.loadPortals().subscribe(portals => {
      this.portalsData = portals.map(p => ({ id: p.por_id, name: p.por_name }));
    });

    this.route.data.pluck<UsergroupJson>('usergroup')
      .subscribe(usergroup => {
        this.originalData = usergroup;
        this.id = usergroup ? usergroup.ugr_id : null;
        this.errorDetails = '';
        this.errorMsg = '';
        this.pleaseSave = false;
        if (this.form) {
          this.updateForm(usergroup);
        } else {
          this.createForm(usergroup);
        }
        this.getfocus.focus();
      });

  }

  private createForm(data: UsergroupJson) {
    this.nameCtrl = new FormControl(data ? data.ugr_name : '', Validators.required);
    this.groupsCtrl = new FormControl(data ? data.groups.map(g => g.grp_id) : [], UsergroupComponent.elementsNotEmpty);
    this.portalsCtrl = new FormControl(data ? data.portals.map(p => p.por_id) : [], UsergroupComponent.elementsNotEmpty);
    this.form = this.fb.group({
      name: this.nameCtrl,
      groups: this.groupsCtrl,
      portals: this.portalsCtrl
    });
  }

  private updateForm(data: UsergroupJson) {
    this.nameCtrl.setValue(data ? data.ugr_name : '');
    this.groupsCtrl.setValue(data ? data.groups.map(g => g.grp_id) : []);
    this.portalsCtrl.setValue(data ? data.portals.map(p => p.por_id) : []);
  }

  onSubmit() {
    if (!this.id) {
      this.ugs.addUsergroup(this.nameCtrl.value)
        .subscribe((ret: number) => {
          this.id = ret;
          this.updateGroupsAndPortals();
        },
        (err) => {
          this.errorMsg = 'Error while adding usergroup';
          this.errorDetails = err.text();
        });
    } else {
      this.ugs.updateUsergroup(this.id, this.nameCtrl.value)
        .subscribe(
        () => {
          this.updateGroupsAndPortals();
        },
        (err) => {
          this.errorMsg = 'Error while updating usergroup name';
          this.errorDetails = err.text();
        }
        );
    }
  }

  doCancel() {
    this.goBackToList();
  }

  doReset() {
    this.createForm(this.originalData);
    this.pleaseSave = false;
  }

  doDelete() {
    this.ugs.deleteUsergroup(this.id).subscribe(
      ret => {
        this.goBackToList();
      },
      (err) => {
        this.errorMsg = 'Error while deleting an usergroup';
        this.errorDetails = err.text();
      }
    );
  }

  private updateGroupsAndPortals() {
    this.ugs.setGroups(this.id, this.groupsCtrl.value).subscribe(
      () => {
        this.ugs.setPortals(this.id, this.portalsCtrl.value).subscribe(
          () => { this.goBackToList(true); },
          (err) => {
            this.errorMsg = 'Error while updating usergroup portals';
            this.errorDetails = err.text();
          }
        );
      },
      (err) => {
        this.errorMsg = 'Error while updating usergroup groups';
        this.errorDetails = err.text();
      }
    );
  }

  goBackToList(withSelected = false) {
    if (this.form) {
      this.form.reset();
    }
    if (withSelected) {
      this.router.navigate(['/admin/usergroups', { selid: this.id }]);
    } else {
      this.router.navigate(['/admin/usergroups']);
    }
  }

  canDeactivate() {
    let ret = this.form.pristine;
    this.pleaseSave = !ret;
    return ret;
  }
}
