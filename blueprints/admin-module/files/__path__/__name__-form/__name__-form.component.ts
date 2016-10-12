import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MdInput } from '@angular/material';

import { <%= classifiedModuleName %>Service, Db<%= classifiedModuleName %> } from '../<%= dasherizedModuleName %>.service';
import { CanComponentDeactivate } from '../../../guards/can-deactivate.guard';

@Component({
  selector: '<%= selector %>-form',
  templateUrl: './<%= dasherizedModuleName %>-form.component.html',
  styleUrls: ['./<%= dasherizedModuleName %>-form.component.<%= styleExt %>']
})
export class <%= classifiedModuleName %>FormComponent implements OnInit, CanComponentDeactivate {

  @ViewChild(MdInput) getfocus: MdInput;

  id: number;

  form: FormGroup;
  nameCtrl: FormControl;

  originalData: any = null;
  pleaseSave: boolean = false;

  errorMsg: string = '';
  errorDetails: string = '';

  constructor(private route: ActivatedRoute, public router: Router,
    private fb: FormBuilder, public service: <%= classifiedModuleName %>Service) { }

  ngOnInit() {

    this.route.data.pluck < Db<%= classifiedModuleName %>>('<%= camelizedModuleName %>')
      .subscribe(element => {
        this.originalData = element;
        this.id = element ? element.id : null;
        this.errorMsg = '';
        this.errorDetails = '';
        this.pleaseSave = false;
        if (this.form) {
          this.updateForm(element);
        } else {
          this.createForm(element);
        }
        this.getfocus.focus();
      });
  }

  private createForm(data: Db<%= classifiedModuleName %>) {
    this.nameCtrl = new FormControl(data ? data.name : '', Validators.required);
    this.form = this.fb.group({
      name: this.nameCtrl
    });
  }

  private updateForm(data: Db<%= classifiedModuleName %>) {
    this.nameCtrl.setValue(data ? data.name : '');
  }

  onSubmit() {
    if (!this.id) {
      this.service.add<%= classifiedModuleName %>(this.nameCtrl.value)
        .subscribe((ret: number) => {
          this.id = ret;
          this.goBackToList(true);
        },
        (err) => {
          this.errorMsg = 'Error adding <%= dasherizedModuleName %>';
          this.errorDetails = err.text();
        });
    } else {
      this.service.update<%= classifiedModuleName %>(this.id, this.nameCtrl.value)
        .subscribe(ret => {
          this.goBackToList(true);
        },
        (err) => {
          this.errorMsg = 'Error updating <%= dasherizedModuleName %>';
          this.errorDetails = err.text();
        });
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
    this.service.delete<%= classifiedModuleName %>(this.id).subscribe(ret => {
      this.goBackToList();
    },
      (err) => {
        this.errorMsg = 'Error deleting <%= dasherizedModuleName %>';
        this.errorDetails = err.text();
      });
  }

  goBackToList(withSelected = false) {
    if (this.form) {
      this.form.reset();
    }
    if (withSelected) {
      this.router.navigate(['/admin/<%= dasherizedModuleName %>', { selid: this.id }]);
    } else {
      this.router.navigate(['/admin/<%= dasherizedModuleName %>']);
    }
  }

  canDeactivate() {
    let ret = this.form.pristine;
    this.pleaseSave = !ret;
    return ret;
  }
}
