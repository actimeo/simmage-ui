import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MdInput } from '@angular/material';

import '../../../rxjs_operators';

import { EventsTypesService } from '../events-types.service';
import { CanComponentDeactivate } from '../../../guards/can-deactivate.guard';
import { TopicService } from '../../../shared/topic.service';
import { OrganService } from '../../../shared/organ.service';

import { EventTypeJson } from '../../../db-models/json';

@Component({
  selector: 'app-events-types-form',
  templateUrl: './events-types-form.component.html',
  styleUrls: ['./events-types-form.component.css']
})
export class EventsTypesFormComponent implements OnInit, AfterViewInit, CanComponentDeactivate {

  @ViewChild('getfocus') getfocus: MdInput;

  id: number = null;
  defaultCat: string = '';

  form: FormGroup;
  nameCtrl: FormControl;
  categoryCtrl: FormControl;
  individualNameCtrl: FormControl;
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

    this.route.params.pluck<string>('cat').subscribe(cat => this.defaultCat = cat);

    this.route.data.pluck<EventTypeJson>('eventsTypes')
      .subscribe((eventType: EventTypeJson) => {
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
      });
  }

  ngAfterViewInit() {
    setTimeout(_ => this.getfocus.focus(), 0);
  }

  private createForm(data: EventTypeJson) {
    this.nameCtrl = new FormControl(data ? data.ety_name : '', Validators.required);
    this.categoryCtrl = new FormControl(data ? data.ety_category : this.defaultCat, Validators.required);
    this.individualNameCtrl = new FormControl(data ? data.ety_individual_name : null, Validators.required);
    this.topicsCtrl = new FormControl(data ? data.topics.map(t => t.top_id) : []);
    this.organsCtrl = new FormControl(data ? data.organizations.map(o => o.org_id) : []);
    this.form = this.fb.group({
      name: this.nameCtrl,
      category: this.categoryCtrl,
      individualName: this.individualNameCtrl,
      topics: this.topicsCtrl,
      organs: this.organsCtrl
    });
  }

  private updateForm(data: EventTypeJson) {
    this.nameCtrl.setValue(data ? data.ety_name : '');
    this.categoryCtrl.setValue(data ? data.ety_category : this.defaultCat);
    this.individualNameCtrl.setValue(data ? data.ety_individual_name : null);
    this.topicsCtrl.setValue(data ? data.topics.map(t => t.top_id) : []);
    this.organsCtrl.setValue(data ? data.organizations.map(o => o.org_id) : []);
  }

  onSubmit() {
    if (!this.id) {
      this.service.addEventsTypes(this.nameCtrl.value, this.categoryCtrl.value,
        this.individualNameCtrl.value, this.topicsCtrl.value, this.organsCtrl.value)
        .subscribe((ret: number) => {
          this.id = ret;
          this.goBackToList(true);
        },
        (err) => {
          this.errorMsg = 'Error adding events-types';
          this.errorDetails = err.text();
        });
    } else {
      this.service.updateEventsTypes(this.id, this.nameCtrl.value, this.categoryCtrl.value,
        this.individualNameCtrl.value, this.topicsCtrl.value, this.organsCtrl.value)
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
      this.router.navigate(['/admin/events-types', { selid: this.id, cat: this.defaultCat }]);
    } else {
      this.router.navigate(['/admin/events-types', { cat: this.defaultCat }]);
    }
  }

  canDeactivate() {
    let ret = this.form.pristine;
    this.pleaseSave = !ret;
    return ret;
  }
}
