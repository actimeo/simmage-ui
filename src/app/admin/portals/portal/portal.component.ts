import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { PortalsService } from '../../../shared/portals.service';
import { DbPortal } from '../../../db-models/portal';
import { CanComponentDeactivate } from '../../../guards/can-deactivate.guard';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit, CanComponentDeactivate {

  id: number;
  creatingNew: boolean = false;

  form: FormGroup;
  nameCtrl: FormControl;
  descriptionCtrl: FormControl;

  originalData: DbPortal = { por_id: null, por_name: null, por_description: null };
  pleaseSave: boolean = false;

  errorMsg: string = '';
  errorDetails: string = '';

  constructor(private route: ActivatedRoute, public router: Router,
    private fb: FormBuilder, public ps: PortalsService) { }

  ngOnInit() {
    this.nameCtrl = new FormControl('', Validators.required);
    this.descriptionCtrl = new FormControl('', Validators.required);
    this.form = this.fb.group({
      name: this.nameCtrl,
      description: this.descriptionCtrl
    });

    this.route.data.forEach((data: { portal: DbPortal }) => {
      if ('portal' in data) {
        this.id = data.portal.por_id;
        this.creatingNew = false;
        this.nameCtrl.setValue(data.portal.por_name);
        this.descriptionCtrl.setValue(data.portal.por_description);
      } else {
        this.creatingNew = true;
        this.nameCtrl.setValue('');
        this.descriptionCtrl.setValue('');
      }
      this.setOriginalDataFromFields();
      this.errorMsg = '';
      this.errorDetails = '';
    });
  }

  onSubmit() {
    this.setOriginalDataFromFields();
    if (this.creatingNew) {
      this.ps.addPortal(this.nameCtrl.value, this.descriptionCtrl.value)
        .subscribe((ret: number) => {
          this.id = ret;
          this.goBackToList(true);
        },
        (err) => {
          this.errorMsg = 'Error while adding a portal';
          this.errorDetails = err.text();
        });
    } else {
      this.ps.updatePortal(this.id, this.nameCtrl.value, this.descriptionCtrl.value)
        .subscribe(ret => {
          this.goBackToList(true);
        },
        (err) => {
          this.errorMsg = 'Error while updating a portal';
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
    this.ps.deletePortal(this.id).subscribe(ret => {
      this.goBackToList();
    },
    (err) => {
      this.errorMsg = 'Error while trying to delete a portal';
      this.errorDetails = err.text();
    });    
  }

  goBackToList(withSelected = false) {
    if (withSelected) {
      this.router.navigate(['/admin/portals', { selid: this.id }]);
    } else {
      this.router.navigate(['/admin/portals']);
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
    this.originalData.por_name = this.nameCtrl.value;
    this.originalData.por_description = this.descriptionCtrl.value;
  }

  private originalDataChanged() {
    return this.originalData.por_name !== this.nameCtrl.value
      || this.originalData.por_description !== this.descriptionCtrl.value;
  }

}
