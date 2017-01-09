import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MdInput } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import { EventsService } from '../../../../shared/events.service';
import { EventService } from '../event.service';
import { DossiersService } from '../../../../dossiers.service';

import { DbEventTypeList, DbEvent } from '../../../../db-models/events';
import { EventJson } from '../../../../db-models/json';
import { DbTopic, DbDossier } from '../../../../db-models/organ';
import { DbMainmenu } from '../../../../db-models/portal';
import { CanComponentDeactivate } from '../../../../guards/can-deactivate.guard';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, AfterViewInit, CanComponentDeactivate {

   @ViewChild(MdInput) getfocus: MdInput;

  id: number;
  menuId: number;
  viewId: number;

  form: FormGroup;
  titleCtrl: FormControl;
  etyCtrl: FormControl;
  durationCtrl: FormControl;
  recurentCtrl: FormControl;

  formOccurence: FormGroup;
  occurenceCtrl: FormControl;
  docctimeCtrl: FormControl;
  mocctimeCtrl: FormControl;
  occrepeatCtrl: FormControl;

  startdateCtrl: FormControl;
  enddateCtrl: FormControl;
  topicsCtrl: FormControl;
  dossierCtrl: FormControl;

  eventsTypeList: Observable<any[]>;
  viewTopics: any[] = [];
  dossiersList: any[] = [];

  originalData: any = null;
  pleaseSave: boolean = false;

  errorMsg: string = '';
  errorDetails: string = '';

  static recurentCheck(control: FormControl) {
    return control.value && control.value.length !== 0 ? null : { mustContainValues: true };
  }

  static occurenceValueCheck(group: FormGroup) {
    if (!group.controls['recurent'].value) {
      return null;
    } else {
      let check = null;
      group.controls['occrepeat'].value > 0 && group.controls['occrepeat'].value <= 20 ? '' : check = { invalidValue: true };
      if (group.controls['occurence'].value === 'daily') {
        group.controls['docctime'].value > 0 && group.controls['docctime'].value <= 30 ? '' : check = { invalidValue: true };
      } else if (group.controls['occurence'].value === 'monthly') {
        group.controls['mocctime'].value !== '' ? '' : check = { invalidValue: true };
      } else {
        check = { noValueSelected: true };
      }

      return check;
    }
  }

  constructor(private route: ActivatedRoute, public router: Router,
    private fb: FormBuilder, public eventsService: EventsService,
    public service: EventService, public dossiersService: DossiersService) { }

  ngOnInit() {
    this.route.data.pluck<EventJson>('event')
      .subscribe(element => {
        let ev = element ? element[0] : null;
        this.originalData = ev;
        this.id = ev ? ev.eve_id : null;
        this.errorMsg = '';
        this.errorDetails = '';
        this.pleaseSave = false;
        if (this.form) {
          this.updateForm(ev);
        } else {
          this.createForm(ev);
        }
      });
    this.route.data.pluck<DbMainmenu>('data').subscribe(data => {
      this.menuId = data.mme_id;
      this.viewId = data.mme_content_id;
      this.eventsService.loadViewTopics(this.viewId).subscribe(tops => {
        this.viewTopics = tops.map(t => ({ id: t.top_id, name: t.top_name }));
        this.eventsTypeList = this.eventsService.loadEventsTypes(this.viewId, tops.map(t => t.top_id));
      });
    });

    this.dossiersService.loadDossiers(false, false, null)
      .subscribe(dossiers => this.dossiersList = dossiers.map(d => ({ id: d.dos_id, name: d.dos_lastname + " " + d.dos_firstname })));
  }

  ngAfterViewInit() {
    setTimeout(_ => this.getfocus.focus(), 0);
  }

  private createForm(data: EventJson) {
    this.titleCtrl = new FormControl(data ? data.eve_title : '', Validators.required);
    this.etyCtrl = new FormControl(data ? data.ety_id : '', Validators.required);
    this.recurentCtrl = new FormControl(false);
    this.durationCtrl = new FormControl(data ? data.eve_duration : '', Validators.required);
    this.occurenceCtrl = new FormControl('');
    this.docctimeCtrl = new FormControl('');
    this.mocctimeCtrl = new FormControl('');
    this.occrepeatCtrl = new FormControl('');
    this.startdateCtrl = new FormControl(data ? data.eve_start_time : '', Validators.required);
    this.enddateCtrl = new FormControl(data ? data.eve_end_time : '');
    this.topicsCtrl = new FormControl(data ? data.topics ? data.topics.map(t => t.top_id) : [] : []);
    this.dossierCtrl = new FormControl(data ? data.dossiers ? data.dossiers.map(d => d.dos_id) : [] : []);

    this.formOccurence = this.fb.group({
      recurent: this.recurentCtrl,
      occurence: this.occurenceCtrl,
      docctime: this.docctimeCtrl,
      mocctime: this.mocctimeCtrl,
      occrepeat: this.occrepeatCtrl
    }, { validator: EventComponent.occurenceValueCheck });

    this.form = this.fb.group({
      title: this.titleCtrl,
      ety: this.etyCtrl,
      formoccurence: this.formOccurence,
      duration: this.durationCtrl,
      startdate: this.startdateCtrl,
      enddate: this.enddateCtrl,
      topics: this.topicsCtrl,
      dossiers: this.dossierCtrl
    });
    if (data) {
      this.eventsTypeList = this.eventsService.loadEventsTypes(this.viewId, data ? data.topics ? data.topics.map(t => t.top_id) : [] : []);
    }
    this.form.valueChanges.subscribe(v => {
      console.log(v.formoccurence);
      if (v.topics !== null) {
        this.eventsTypeList = this.eventsService.loadEventsTypes(this.viewId, v.topics);
      }
    });
  }

  private updateForm(data: EventJson) {
    this.titleCtrl.setValue(data ? data.eve_title : '');
    this.etyCtrl.setValue(data ? data.ety_id : '');
    this.recurentCtrl.setValue(false);
    this.durationCtrl.setValue(data ? data.eve_duration : '');
    this.startdateCtrl.setValue(data ? data.eve_start_time : '');
    this.enddateCtrl.setValue(data ? data.eve_end_time : '');
    this.topicsCtrl.setValue(data ? data.topics.map(t => t.top_id) : []);
    this.dossierCtrl.setValue(data ? data.dossiers.map(d => d.dos_id) : []);
  }

  onSubmit() {
    /*if (!this.id) {
      this.service.addDocument(
        this.responsibleCtrl.value, this.dtyCtrl.value > 0 ? this.dtyCtrl.value : null, this.titleCtrl.value,
        this.descriptionCtrl.value, this.statusCtrl.value, this.obtainmentCtrl.value, this.executionCtrl.value,
        this.validityCtrl.value, this.topicsCtrl.value, this.dossierCtrl.value
        ).subscribe(ret => {
          this.id = ret;
          this.goBackToList(true);
        },
        (err) => {
          this.errorMsg = 'Error while adding a document';
          this.errorDetails = err.text();
        });
    } else {
      this.service.updateDocument(
        this.id, this.responsibleCtrl.value, this.dtyCtrl.value > 0 ? this.dtyCtrl.value : null, this.titleCtrl.value,
        this.descriptionCtrl.value, this.statusCtrl.value, this.obtainmentCtrl.value, this.executionCtrl.value,
        this.validityCtrl.value, this.topicsCtrl.value, this.dossierCtrl.value
        ).subscribe(ret => {
          this.goBackToList(true);
        },
        (err) => {
          this.errorMsg = 'Error while updating the document';
          this.errorDetails = err.text();
        });
    }*/
  }

  doCancel() {
    this.goBackToList();
  }

  doReset() {
    this.createForm(this.originalData);
    this.pleaseSave = false;
  }

  doDelete() {
    /*this.service.deleteDocument(this.id).subscribe(ret => {
      this.goBackToList();
    },
    (err) => {
      this.errorMsg = 'Error while deleting the document';
      this.errorDetails = err.text();
    });*/
  }

  goBackToList(withSelected = false) {
    if (this.form) {
      this.form.reset();
    }

    if(withSelected) {
      this.router.navigate(['/main/' + this.menuId + '/events', { seldoc: this.id }])
    } else {
      this.router.navigate(['/main/' + this.menuId + '/events']);
    }
  }

  private isRecurent() {
    return this.recurentCtrl.value;
  }

  canDeactivate() {
    let ret = this.form.pristine;
    this.pleaseSave = !ret;
    return ret;
  }
}
