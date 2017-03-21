import {ActivatedRoute, Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DbDossier, DbTopic } from '../../../services/backend/db-models/organ';
import { DbEvent, DbEventTypeList } from '../../../services/backend/db-models/events';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';

import { DbMainmenu } from '../../../services/backend/db-models/portal';
import { DossiersService } from '../../../services/backend/dossiers.service';
import { ResourcesService } from '../../../services/backend/resources.service';

import { EventJson } from '../../../services/backend/db-models/json';
import { EventService } from '../../../services/backend/event.service';
import { EventTypeSelectorComponent } from '../../../shared/event-type-selector/event-type-selector.component';
import { EventsService } from '../../../services/backend/events.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  id: number;
  contentId: number;
  viewId: number;

  catExpense = false;
  weekday: string;
  wdOcc: string;
  dateDay: string;

  eventDossierRadio = true;

  form: FormGroup;
  titleCtrl: FormControl;
  etyCtrl: FormControl;
  durationCtrl: FormControl;
  placeCtrl: FormControl;
  costCtrl: FormControl;
  descriptionCtrl: FormControl;
  sumupCtrl: FormControl;
  recurentCtrl: FormControl;

  formOccurence: FormGroup;
  occurenceCtrl: FormControl;
  docctimeCtrl: FormControl;
  mocctimeCtrl: FormControl;
  occrepeatCtrl: FormControl;

  startdateCtrl: FormControl;
  starttimeCtrl: FormControl;
  enddateCtrl: FormControl;
  endtimeCtrl: FormControl;

  topicsCtrl: FormControl;
  dossierCtrl: FormControl;
  participantCtrl: FormControl;
  resourceCtrl: FormControl;

  eventTypeCtrl: FormControl;

  eventsTypeList: Observable<any[]>;
  viewTopics: any[] = [];
  dossiersList: any[] = [];
  resourcesList: any[] = [];

  originalData: any = null;
  pleaseSave = false;

  errorMsg = '';
  errorDetails = '';

  static recurentCheck(control: FormControl) {
    return control.value && control.value.length !== 0 ? null : { mustContainValues: true };
  }

  static occurenceValueCheck(group: FormGroup) {
    if (!group.controls['recurent'].value) {
      return null;
    } else {
      let check = null;
      check = group.controls['occrepeat'].value > 0 && group.controls['occrepeat'].value <= 1000 ? null : { invalidValue: true };
      if (group.controls['occurence'].value === 'daily') {
        check = group.controls['docctime'].value > 0 && group.controls['docctime'].value <= 1000 ? null : { invalidValue: true };
      } else if (group.controls['occurence'].value === 'monthly') {
        check = group.controls['mocctime'].value !== '' ? null : { invalidValue: true };
      } else {
        check = { noValueSelected: true };
      }
      return check;
    }
  }

  static dossierParticipantNotEmpty(group: FormGroup) {
    return group.controls['dossiers'].value && group.controls['dossiers'].value.length === 0
        && group.controls['participants'].value && group.controls['participants'].value.length === 0 ? { mustContainAValue: true } : null;
  }

  static elementsNotEmpty(control: FormControl) {
    return control.value && control.value.length !== 0 ? null : { mustContainValues: true };
  }

  constructor(private route: ActivatedRoute, public router: Router,
    private fb: FormBuilder, public eventsService: EventsService,
    public service: EventService, public dossiersService: DossiersService,
    public resourcesService: ResourcesService, public dialogRef: MdDialogRef<EventComponent>) { }

  ngOnInit() {
    this.errorMsg = '';
    this.errorDetails = '';
    this.pleaseSave = false;

    this.originalData = null;
    this.createForm(null);

    if (this.id) {
      this.service.getEvent(this.id).subscribe(event => {
        const eve = event ? event[0] : null;
        this.originalData = eve;
        if (this.form) {
          this.updateForm(eve);
        } else {
          this.createForm(eve);
        }
      });
    }

    this.resourcesService.loadResourcesInView(this.viewId, null)
      .subscribe(resources => this.resourcesList = resources.map( r => ({ id: r.res_id, name: r.res_name })));

    this.dossiersService.loadDossiers(false, false, null, true)
      .subscribe(dossiers => this.dossiersList = dossiers.map(d => ({ id: d.dos_id, name: d.dos_lastname + ' ' + d.dos_firstname })));
  }

  private createForm(data: EventJson) {
    this.titleCtrl = new FormControl(data ? data.eve_title : '', Validators.required);
    this.recurentCtrl = new FormControl(false);
    this.durationCtrl = new FormControl(data ? data.eve_duration : '', Validators.required);
    this.placeCtrl = new FormControl(data ? data.eve_place : '');
    this.costCtrl = new FormControl(data ? data.eve_cost : '');
    this.descriptionCtrl = new FormControl(data ? data.eve_description : '');
    this.sumupCtrl = new FormControl(data ? data.eve_sumup : '');
    this.occurenceCtrl = new FormControl('');
    this.docctimeCtrl = new FormControl('');
    this.mocctimeCtrl = new FormControl('');
    this.occrepeatCtrl = new FormControl('');
    this.startdateCtrl = new FormControl(data ? data.eve_start_time : '', Validators.required);
    // this.starttimeCtrl = new FormControl(data ? data.eve_start_time : '', Validators.required);
    this.enddateCtrl = new FormControl(data ? data.eve_end_time : '');
    // this.endtimeCtrl = new FormControl(data ? data.eve_end_time : '');
    this.dossierCtrl = new FormControl(data && data.dossiers ? data.dossiers.map(d => d.dos_id) : []);
    this.participantCtrl = new FormControl(data && data.participants ? data.participants.map(p => p.par_id) : []);
    this.resourceCtrl = new FormControl(data && data.resources ? data.resources.map(r => r.res_id) : []);

    this.eventTypeCtrl = new FormControl(data ? {
                                                  topics: data.topics ? data.topics.map(t => t.top_id) : [],
                                                  ety: data.ety_id ? data.ety_id : 0,
                                                  cat: data.ety_category
                                                } : {
                                                  topics: [],
                                                  ety: '',
                                                  cat: ''
                                                }, EventTypeSelectorComponent.validatorTypeOther);

    this.catExpense = data ? data.ety_category === 'expense' ? true : false : false;

    this.formOccurence = this.fb.group({
      recurent: this.recurentCtrl,
      occurence: this.occurenceCtrl,
      docctime: this.docctimeCtrl,
      mocctime: this.mocctimeCtrl,
      occrepeat: this.occrepeatCtrl
    }, { validator: EventComponent.occurenceValueCheck });

    this.form = this.fb.group({
      title: this.titleCtrl,
      formoccurence: this.formOccurence,
      duration: this.durationCtrl,
      place: this.placeCtrl,
      cost: this.costCtrl,
      description: this.descriptionCtrl,
      sumup: this.sumupCtrl,
      startdate: this.startdateCtrl,
      // starttime: this.starttimeCtrl,
      enddate: this.enddateCtrl,
      // endtime: this.endtimeCtrl,
      dossiers: this.dossierCtrl,
      participants: this.participantCtrl,
      resources: this.resourceCtrl,
      eventType: this.eventTypeCtrl
    }, { validator: EventComponent.dossierParticipantNotEmpty });
    this.setWatchers();
  }

  private updateForm(data: EventJson) {
    this.titleCtrl.setValue(data ? data.eve_title : '');
    this.recurentCtrl.setValue(false);
    this.durationCtrl.setValue(data ? data.eve_duration : '');
    this.placeCtrl.setValue(data ? data.eve_place : '');
    this.costCtrl.setValue(data ? data.eve_cost : '');
    this.descriptionCtrl.setValue(data ? data.eve_description : '');
    this.sumupCtrl.setValue(data ? data.eve_sumup : '');
    this.occurenceCtrl.setValue('');
    this.docctimeCtrl.setValue('');
    this.mocctimeCtrl.setValue('');
    this.occrepeatCtrl.setValue('');
    this.startdateCtrl.setValue(data ? data.eve_start_time : '');
    // this.starttimeCtrl.setValue(data ? data.eve_start_time : '');
    this.enddateCtrl.setValue(data ? data.eve_end_time : '');
    // this.endtimeCtrl.setValue(data ? data.eve_end_time : '');
    this.dossierCtrl.setValue(data && data.dossiers ? data.dossiers.map(d => d.dos_id) : []);
    this.participantCtrl.setValue(data && data.participants ? data.participants.map(p => p.par_id) : []);
    this.resourceCtrl.setValue(data && data.resources ? data.resources.map(r => r.res_id) : []);
    this.eventTypeCtrl.setValue(data ? {
                                        topics: data.topics ? data.topics.map(t => t.top_id) : [],
                                        ety: data.ety_id,
                                        cat: data.ety_category
                                      } : {
                                        topics: [],
                                        ety: '',
                                        cat: ''
                                      });
    this.setWatchers();
  }

  private setWatchers() {
    this.startdateCtrl.valueChanges.debounceTime(300).subscribe(v => {
      if (v !== null) {
        const dateParts = v.split('/');
        if (dateParts.length === 3) {
          const date = new Date(dateParts[1] + '/' + dateParts[0] + '/' + dateParts[2]);
          this.dateDay = date.getDate().toString();
          this.wdOcc = Math.ceil(date.getDate() / 7) === 1
          ? '1st' : Math.ceil(date.getDate() / 7) === 2 ? '2nd' : Math.ceil(date.getDate() / 7) === 3
          ? '3rd' : 'last';
          this.weekday = date.toLocaleString(localStorage.getItem('lang'), { weekday: 'long' });
        }
      }
    });

    this.eventTypeCtrl.valueChanges.debounceTime(300).subscribe(v => {
      if (v !== null) {
        this.catExpense = (v.cat === 'expense') ? true : false;
      }
    });
  }

  onSubmit() {
    if (!this.id) {
      this.service.addEvent(
        this.titleCtrl.value,
        this.eventTypeCtrl.value.ety > 0 ? this.eventTypeCtrl.value.ety : null, this.durationCtrl.value,
        this.startdateCtrl.value, this.enddateCtrl.value, this.placeCtrl.value,
        this.catExpense ? this.costCtrl.value : '', this.descriptionCtrl.value, this.sumupCtrl.value,
        this.recurentCtrl.value, this.occurenceCtrl.value, this.docctimeCtrl.value, this.mocctimeCtrl.value,
        this.occrepeatCtrl.value,
        this.eventTypeCtrl.value.topics, this.dossierCtrl.value, this.participantCtrl.value, this.resourceCtrl.value
      ).subscribe(ret => {
          this.id = ret;
          this.closeForm(ret);
        },
        (err) => {
          this.errorMsg = 'Error while adding an event';
          this.errorDetails = err.text();
        });
    } else {
      this.service.editEvent(this.id,
        this.titleCtrl.value, this.eventTypeCtrl.value.ety > 0 ? this.eventTypeCtrl.value.ety : null, this.durationCtrl.value,
        this.startdateCtrl.value, this.enddateCtrl.value, this.placeCtrl.value,
        this.catExpense ? this.costCtrl.value : '', this.descriptionCtrl.value, this.sumupCtrl.value,
        this.recurentCtrl.value, this.occurenceCtrl.value, this.docctimeCtrl.value, this.mocctimeCtrl.value,
        this.occrepeatCtrl.value,
        this.eventTypeCtrl.value.topics, this.dossierCtrl.value, this.participantCtrl.value, this.resourceCtrl.value).subscribe(ret => {
          this.closeForm(ret);
        },
        (err) => {
          this.errorMsg = 'Error while updating the event';
          this.errorDetails = err.text();
        });
    }
  }

  doCancel() {
    this.closeForm();
  }

  doReset() {
    this.createForm(this.originalData);
    this.pleaseSave = false;
  }

  doDelete() {
    this.service.deleteEvent(this.id).subscribe(ret => {
      this.closeForm();
    },
    (err) => {
      this.errorMsg = 'Error while deleting the event';
      this.errorDetails = err.text();
    });
  }

  closeForm(id = null) {
    if (this.form) {
      this.form.reset();
    }

    this.dialogRef.close(id);
  }

  private isRecurent() {
    return this.recurentCtrl.value;
  }

  private toggleDossierSelector(val) {
    this.eventDossierRadio = val;
    if (!val) {
      this.dossierCtrl.setValue([]);
    }
  }
}
