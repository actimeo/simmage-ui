import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CanComponentDeactivate } from '../../../services/guards/can-deactivate.guard';
import { DbPortal } from '../../../services/backend/db-models/portal';
import { PortalsService } from '../../../services/backend/portals.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit, AfterViewInit, CanComponentDeactivate {

  @ViewChild('getfocus') getfocus: ElementRef;

  id: number = null;

  form: FormGroup;
  nameCtrl: FormControl;
  descriptionCtrl: FormControl;

  originalData: DbPortal = null;
  pleaseSave = false;

  errorMsg = '';
  errorDetails = '';

  constructor(private route: ActivatedRoute, public router: Router,
    private fb: FormBuilder, public ps: PortalsService) { }

  ngOnInit() {
    this.route.data.pluck('portal')
      .subscribe((portal: DbPortal) => {
        this.originalData = portal;
        this.id = portal ? portal.por_id : null;
        this.errorMsg = '';
        this.errorDetails = '';
        this.pleaseSave = false;
        if (this.form) {
          this.updateForm(portal);
        } else {
          this.createForm(portal);
        }
      });
  }

  ngAfterViewInit() {
    setTimeout(_ => this.getfocus.nativeElement.focus(), 0);
  }

  private createForm(data: DbPortal) {
    this.nameCtrl = new FormControl(data ? data.por_name : '', Validators.required);
    this.descriptionCtrl = new FormControl(data ? data.por_description : '', Validators.required);
    this.form = this.fb.group({
      name: this.nameCtrl,
      description: this.descriptionCtrl
    });
  }

  private updateForm(data: DbPortal) {
    this.nameCtrl.setValue(data ? data.por_name : '');
    this.descriptionCtrl.setValue(data ? data.por_description : '');
  }

  onSubmit() {
    if (!this.id) {
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

  doReset() {
    this.createForm(this.originalData);
    this.pleaseSave = false;
  }

  doCancel() {
    this.goBackToList();
  }

  doDelete() {
    this.ps.deletePortal(this.id).subscribe(ret => {
      this.goBackToList();
    },
      (err) => {
        this.errorMsg = 'Error while trying to delete a portal';
        this.errorDetails = err.text();
      });
  }

  goBackToList(withSelected = false) {
    if (this.form) {
      this.form.reset();
    }
    if (withSelected) {
      this.router.navigate(['/admin/portals', { selid: this.id }]);
    } else {
      this.router.navigate(['/admin/portals']);
    }
  }

  canDeactivate() {
    const ret = this.form.pristine;
    this.pleaseSave = !ret;
    return ret;
  }
}
