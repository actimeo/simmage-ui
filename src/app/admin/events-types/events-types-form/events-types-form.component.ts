import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MdInput } from '@angular/material';

import '../../../rxjs_operators';

import { EventsTypesService } from '../events-types.service';
import { CanComponentDeactivate } from '../../../guards/can-deactivate.guard';
import { DbEventType } from '../../../db-models/events';
import { TopicService } from '../../../shared/topic.service';
import { OrganService } from '../../../shared/organ.service';

@Component({
  selector: 'app-events-types-form',
  templateUrl: './events-types-form.component.html',
  styleUrls: ['./events-types-form.component.css']
})
export class EventsTypesFormComponent implements OnInit, CanComponentDeactivate {

  @ViewChild(MdInput) getfocus: MdInput;

  id: number = null;

  form: FormGroup;
  nameCtrl: FormControl;
  categoryCtrl: FormControl;
  topicsCtrl: FormControl;
  organsCtrl: FormControl;

  topicsList: any[] = [];
  orgsList: any[] = [];

  originalData: any = null;

  pleaseSave: boolean = false;
  errorMsg: string = '';
  errorDetails: string = '';

  static topicsNotEmpty(control: FormControl) {
    return control.value && control.value.length !== 0 ? null : { mustContainValues: true };
  }

  constructor(private route: ActivatedRoute, public router: Router,
    private fb: FormBuilder, public service: EventsTypesService,
    private topicService: TopicService, private organService: OrganService) { }

  ngOnInit() {
    this.topicService.loadTopics().subscribe(topics => {
      this.topicsList = topics.map(t => ({ id: t.top_id, name: t.top_name }));
    });

    this.organService.loadOrganizations(true).subscribe(orgs => {
      this.orgsList = orgs.map(o => ({ id: o.org_id, name: o.org_name }));
    });

    this.route.data.pluck<DbEventType>('eventsTypes').subscribe(eventType => {
      this.originalData = eventType;
      this.id = eventType ? eventType.ety_id : null;
      this.errorMsg = '';
      this.errorDetails = '';
      this.pleaseSave = false;
      if (this.form) {
        this.updateForm(eventType);
      } else {
        this.createForm(eventType);
      }
      this.getfocus.focus();
    });
  }

  private createForm(data: DbEventType) {
    this.nameCtrl = new FormControl(data ? data.ety_name : '', Validators.required);
    this.categoryCtrl = new FormControl(data ? data.ety_category : '', Validators.required);
    this.topicsCtrl = new FormControl([]);
    this.organsCtrl = new FormControl([]);
    this.form = this.fb.group({
      name: this.nameCtrl,
      category: this.categoryCtrl,
      topics: this.topicsCtrl,
      organs: this.organsCtrl
    });
  }

  private updateForm(data: DbEventType) {
    this.nameCtrl.setValue(data ? data.ety_name : '');
    this.categoryCtrl.setValue(data ? data.ety_category : '');
    this.topicsCtrl.setValue([]);
    this.organsCtrl.setValue([]);
  }

  onSubmit() {
    if (!this.id) {
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
    this.goBackToList();
  }

  doReset() {
    console.log(this.originalData);
    this.createForm(this.originalData);
    this.pleaseSave = false;
  }

  doDelete() {
    this.service.deleteEventsTypes(this.id).subscribe(ret => {
      this.goBackToList();
    },
      (err) => {
        this.errorMsg = 'Error deleting events-types';
        this.errorDetails = err.text();
      });
  }

  goBackToList(withSelected = false) {
    if (this.form) {
      this.form.reset();
    }
    if (withSelected) {
      this.router.navigate(['/admin/events-types', { selid: this.id }]);
    } else {
      this.router.navigate(['/admin/events-types']);
    }
  }

  canDeactivate() {
    let ret = this.form.pristine;
    this.pleaseSave = !ret;
    return ret;
  }
}
