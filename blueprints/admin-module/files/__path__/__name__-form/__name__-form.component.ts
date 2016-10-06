import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { <%= classifiedModuleName %>Service } from '../<%= dasherizedModuleName %>.service';

@Component({
  selector: '<%= selector %>-form',
  templateUrl: './<%= dasherizedModuleName %>-form.component.html',
  styleUrls: ['./<%= dasherizedModuleName %>-form.component.<%= styleExt %>']
})
export class <%= classifiedModuleName %>FormComponent implements OnInit {

  id: number;
  creatingNew: boolean = false;

  form: FormGroup;
  nameCtrl: FormControl;

  originalData: any = { id: null, name: null, description: null };
  pleaseSave: boolean = false;

  errorMsg: string = '';
  errorDetails: string = '';

  constructor(private route: ActivatedRoute, public router: Router,
    private fb: FormBuilder, public service: <%= classifiedModuleName %>Service) { }

  ngOnInit() {
    this.nameCtrl = new FormControl('', Validators.required);
    this.form = this.fb.group({
      name: this.nameCtrl
    });

    this.route.data.forEach((data: { <%= camelizedModuleName %>: any }) => {
      if ('<%= camelizedModuleName %>' in data) {
        this.id = data.<%= camelizedModuleName %>.id;
        this.creatingNew = false;
        this.nameCtrl.setValue(data.<%= camelizedModuleName %>.name);
      } else {
        this.creatingNew = true;
        this.nameCtrl.setValue('');
      }
      this.setOriginalDataFromFields();
      this.errorMsg = '';
      this.errorDetails = '';
    });
  }

  onSubmit() {
    this.setOriginalDataFromFields();
    if (this.creatingNew) {
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
    this.setOriginalDataFromFields();
    this.goBackToList();
  }

  doDelete() {
    this.setOriginalDataFromFields();
    this.service.delete<%= classifiedModuleName %>(this.id).subscribe(ret => {
      this.goBackToList();
    },
      (err) => {
        this.errorMsg = 'Error deleting <%= dasherizedModuleName %>';
        this.errorDetails = err.text();
      });
  }

  goBackToList(withSelected = false) {
    if (withSelected) {
      this.router.navigate(['/admin/<%= dasherizedModuleName %>', { selid: this.id }]);
    } else {
      this.router.navigate(['/admin/<%= dasherizedModuleName %>']);
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
    this.originalData.name = this.nameCtrl.value;
  }

  private originalDataChanged() {
    return this.originalData.name !== this.nameCtrl.value;
  }
}
