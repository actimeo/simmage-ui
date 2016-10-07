import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { EventsTypesService } from '../events-types.service';
import { CanComponentDeactivate } from '../../../guards/can-deactivate.guard';
import { DbEventType } from '../../../db-models/events';

@Component({
  selector: 'app-events-types-form',
  templateUrl: './events-types-form.component.html',
  styleUrls: ['./events-types-form.component.css']
})
export class EventsTypesFormComponent implements OnInit, CanComponentDeactivate {

  id: number;
  creatingNew: boolean = false;

  form: FormGroup;
  nameCtrl: FormControl;
  categoryCtrl: FormControl;

  originalData: any = { id: null, name: null, description: null };
  pleaseSave: boolean = false;

  errorMsg: string = '';
  errorDetails: string = '';

  constructor(private route: ActivatedRoute, public router: Router,
    private fb: FormBuilder, public service: EventsTypesService) { }

  ngOnInit() {
    this.nameCtrl = new FormControl('', Validators.required);
    this.categoryCtrl = new FormControl('', Validators.required);
    this.form = this.fb.group({
      name: this.nameCtrl,
      category: this.categoryCtrl
    });

    this.route.data.forEach((data: { eventsTypes: DbEventType }) => {
      if ('eventsTypes' in data) {
        this.id = data.eventsTypes.ety_id;
        this.creatingNew = false;
        this.nameCtrl.setValue(data.eventsTypes.ety_name);
        this.categoryCtrl.setValue(data.eventsTypes.ety_category);
      } else {
        this.creatingNew = true;
        this.nameCtrl.setValue('');
        this.categoryCtrl.setValue('');
      }
      this.setOriginalDataFromFields();
      this.errorMsg = '';
      this.errorDetails = '';
      this.pleaseSave = false;
    });
  }

  onSubmit() {
    this.setOriginalDataFromFields();
    if (this.creatingNew) {
      this.service.addEventsTypes(this.nameCtrl.value, this.categoryCtrl.value)
        .subscribe((ret: number) => {
          this.id = ret;
          this.goBackToList(true);
        },
        (err) => {
          this.errorMsg = 'Error adding events-types';
          this.errorDetails = err.text();
        });
    } else {
      this.service.updateEventsTypes(this.id, this.nameCtrl.value, this.categoryCtrl.value)
        .subscribe(ret => {
          this.goBackToList(true);
        },
        (err) => {
          this.errorMsg = 'Error updating events-types';
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
    this.service.deleteEventsTypes(this.id).subscribe(ret => {
      this.goBackToList();
    },
      (err) => {
        this.errorMsg = 'Error deleting events-types';
        this.errorDetails = err.text();
      });
  }

  goBackToList(withSelected = false) {
    if (withSelected) {
      this.router.navigate(['/admin/events-types', { selid: this.id }]);
    } else {
      this.router.navigate(['/admin/events-types']);
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
    this.originalData.category = this.categoryCtrl.value;
  }

  private originalDataChanged() {
    return this.originalData.name !== this.nameCtrl.value ||
      this.originalData.category !== this.categoryCtrl.value;
  }
}
