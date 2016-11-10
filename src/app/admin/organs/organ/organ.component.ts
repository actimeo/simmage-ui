import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MdInput } from '@angular/material';

import '../../../rxjs_operators';

import { OrganService } from '../../../shared/organ.service';
import { DbOrganization } from '../../../db-models/organ';
import { CanComponentDeactivate } from '../../../guards/can-deactivate.guard';

@Component({
  selector: 'app-organ',
  templateUrl: './organ.component.html',
  styleUrls: ['./organ.component.css']
})
export class OrganComponent implements OnInit, AfterViewInit, CanComponentDeactivate {

  @ViewChild('getfocus') getfocus: MdInput;

  id: number;

  form: FormGroup;
  nameCtrl: FormControl;
  descriptionCtrl: FormControl;
  internalCtrl: FormControl;

  originalData: DbOrganization = null;
  pleaseSave: boolean = false;

  errorMsg: string = '';
  errorDetails: string = '';

  constructor(private route: ActivatedRoute, private router: Router,
    private fb: FormBuilder, private organService: OrganService) { }

  ngOnInit() {
    this.route.data.pluck<DbOrganization>('organ').subscribe(organ => {
      this.originalData = organ;
      this.id = organ ? organ.org_id : null;
      this.errorMsg = '';
      this.errorDetails = '';
      this.pleaseSave = false;
      if (this.form) {
        this.updateForm(organ);
      } else {
        this.createForm(organ);
      }
    });
  }

  ngAfterViewInit() {
    this.getfocus.focus();
  }

  private createForm(data: DbOrganization) {
    this.nameCtrl = new FormControl(data ? data.org_name : '', Validators.required);
    this.descriptionCtrl = new FormControl(data ? data.org_description : '', Validators.required);
    this.internalCtrl = new FormControl(data ? data.org_internal : null, Validators.required);
    this.form = this.fb.group({
      name: this.nameCtrl,
      description: this.descriptionCtrl,
      internal: this.internalCtrl
    });
  }

  private updateForm(data: DbOrganization) {
    this.nameCtrl.setValue(data ? data.org_name : '');
    this.descriptionCtrl.setValue(data ? data.org_description : '');
    this.internalCtrl.setValue(data ? data.org_internal : null);
  }

  doReset() {
    this.createForm(this.originalData);
    this.pleaseSave = false;
  }

  onSubmit() {
    if (!this.id) {
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
    this.goBackToList();
  }

  doDelete() {
    this.organService.deleteOrgan(this.id).subscribe(ret => {
      this.goBackToList();
    },
      (err) => {
        this.errorMsg = 'Error deleting organization';
        this.errorDetails = err.text();
      });
  }

  private goBackToList(withSelected = false) {
    if (this.form) {
      this.form.reset();
    }
    if (withSelected) {
      this.router.navigate(['/admin/organs', { selid: this.id }]);
    } else {
      this.router.navigate(['/admin/organs']);
    }
  }

  canDeactivate() {
    let ret = this.form.pristine;
    this.pleaseSave = !ret;
    return ret;
  }
}
