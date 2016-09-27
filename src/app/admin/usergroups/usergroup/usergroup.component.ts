import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import '../../../rxjs_operators';

import { UsergroupsService } from '../usergroups.service';
import { DbUsergroup } from '../../../db-models/login';
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

  selectedGroups: any[] = [];
  selectedPortals: any[] = [];

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
    private fb: FormBuilder, private ugs: UsergroupsService) { }

  ngOnInit() {
    this.nameCtrl = new FormControl('', Validators.required);
    this.groupsCtrl = new FormControl(this.authorizedGroups, UsergroupComponent.elementsNotEmpty);
    this.portalsCtrl = new FormControl(this.authorizedPortals, UsergroupComponent.elementsNotEmpty);
    this.form = this.fb.group({
      name: this.nameCtrl,
      groups: this.groupsCtrl,
      portals: this.portalsCtrl
    });

    this.route.data.forEach((data: { usergroup: any }) => {
      if ('usergroup' in data) {
        this.id = data.usergroup.usergroup.ugr_id;
        this.creatingNew = false;
        this.nameCtrl.setValue(data.usergroup.usergroup.ugr_name);
        data.usergroup.groups.forEach(g => {
          this.authorizedGroups.push(g.grp_id);
        });
        this.groupsCtrl.setValue(this.authorizedGroups);
        data.usergroup.portals.forEach(p => {
          this.authorizedPortals.push(p.por_id);
        });
        this.portalsCtrl.setValue(this.authorizedPortals);
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
    this.setOriginalDataFromFields();
    if (this.creatingNew) {
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

  private goBackToList(withSelected = false) {
    if (withSelected) {
      this.router.navigate(['/admin/usergroups', { selid: this.id }]);
    } else {
      this.router.navigate(['/admin/usergroups']);
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
