import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { OrganService } from '../organ.service';
import { DbOrganization } from '../../../db-models/organ';
import { CanComponentDeactivate } from '../../../guards/can-deactivate.guard';

@Component({
  selector: 'app-organ',
  templateUrl: './organ.component.html',
  styleUrls: ['./organ.component.css']
})
export class OrganComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  id: number;
  creatingNew: boolean = false;

  form: FormGroup;
  nameCtrl: FormControl;
  descriptionCtrl: FormControl;
  internalCtrl: FormControl;

  originalData: DbOrganization = { org_id: null, org_name: null, org_description: null, org_internal: null };
  pleaseSave: boolean = false;

  errorMsg: string = '';
  errorDetails: string = '';

  constructor(private route: ActivatedRoute, private router: Router,
    private fb: FormBuilder, private organService: OrganService) { }

  ngOnInit() {
    this.nameCtrl = new FormControl('', Validators.required);
    this.descriptionCtrl = new FormControl('', Validators.required);
    this.internalCtrl = new FormControl('', Validators.required);
    this.form = this.fb.group({
      name: this.nameCtrl,
      description: this.descriptionCtrl,
      internal: this.internalCtrl
    });

    this.route.data.forEach((data: { organ: DbOrganization }) => {
      if ('organ' in data) {
        this.id = data.organ.org_id;
        this.creatingNew = false;
        this.nameCtrl.setValue(data.organ.org_name);
        this.descriptionCtrl.setValue(data.organ.org_description);
        this.internalCtrl.setValue(data.organ.org_internal);
      } else {
        this.creatingNew = true;
        this.nameCtrl.setValue('');
        this.descriptionCtrl.setValue('');
        this.internalCtrl.setValue('');
      }
      this.setOriginalDataFromFields();
      this.errorMsg = '';
      this.errorDetails = '';
    });
  }

  ngOnDestroy() {

  }

  onSubmit() {
    this.setOriginalDataFromFields();
    if (this.creatingNew) {
      this.organService.addOrgan(this.nameCtrl.value, this.descriptionCtrl.value,
        this.internalCtrl.value)
        .subscribe((ret: number) => {
          this.id = ret;
          this.goBackToList(true);
        },
        (err) => {
          this.errorMsg = 'Error adding organization';
          this.errorDetails = err.text();
        });
    } else {
      this.organService.updateOrgan(this.id, this.nameCtrl.value, this.descriptionCtrl.value,
        this.internalCtrl.value)
        .subscribe(ret => {
          this.goBackToList(true);
        },
        (err) => {
          this.errorMsg = 'Error updating organization';
          this.errorDetails = err.text();
        });
    }
  }

  doCancel() {
    this.setOriginalDataFromFields();
    this.goBackToList();
  }

  doDelete() {
    this.setOriginalDataFromFields();
    this.organService.deleteOrgan(this.id).subscribe(ret => {
      this.goBackToList();
    },
      (err) => {
        this.errorMsg = 'Error deleting organization';
        this.errorDetails = err.text();
      });
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
    this.originalData.org_name = this.nameCtrl.value;
    this.originalData.org_description = this.descriptionCtrl.value;
    this.originalData.org_internal = this.internalCtrl.value;
  }

  private originalDataChanged() {
    return this.originalData.org_name !== this.nameCtrl.value
      || this.originalData.org_description !== this.descriptionCtrl.value
      || this.originalData.org_internal !== this.internalCtrl.value;
  }

}
