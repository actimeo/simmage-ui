import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MdInput } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import { ObjectivesService } from '../../../../shared/objectives.service';
import { ObjectiveService } from '../objective.service';
import { DossiersService } from '../../../../dossiers.service';

import { DbObjective } from '../../../../db-models/objectives';
import { ObjectiveJson } from '../../../../db-models/json';
import { DbTopic, DbDossier } from '../../../../db-models/organ';
import { DbMainmenu } from '../../../../db-models/portal';
import { CanComponentDeactivate } from '../../../../guards/can-deactivate.guard';

@Component({
  selector: 'app-objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.css']
})
export class ObjectiveComponent implements OnInit, AfterViewInit, CanComponentDeactivate {

  @ViewChild('getfocus') getfocus: ElementRef;

  id: number;
  viewId: number;

  form: FormGroup;
  titleCtrl: FormControl;

  startlineCtrl: FormControl;
  deadlineCtrl: FormControl;
  topicsCtrl: FormControl;
  dossierCtrl: FormControl;
  statusCtrl: FormControl;

  viewTopics: any[] = [];
  dossiersList: any[] = [];

  originalData: any = null;
  pleaseSave: boolean = false;

  errorMsg: string = '';
  errorDetails: string = '';
  
  static objectivesDossiersValidator(group: FormGroup) {
    let check = null;
    if (group.value.objectiveType == 'dossier') {
      if (group.value.topics.length == 0 || group.value.dossier.length == 0) {
        check = { mustContainValue: true };
      }
    }
    return check;
  }

  static objectiveHasRecipient(group: FormGroup) {
    let check = null;
    if (group.value.objectiveType == 'other') {
      if (group.value.rcptInfo.length == 0 && group.value.rcptAct.length == 0) {
        check = { mustSelectRecipient: true };
      }
    }
    return check;
  }

  constructor(private route: ActivatedRoute, public router: Router,
    private fb: FormBuilder, public objectivesService: ObjectivesService,
    public service: ObjectiveService, public dossiersService: DossiersService) { }

  ngOnInit() {
    this.route.data.pluck('objective')
      .subscribe((element: ObjectiveJson) => {
        let objective = element ? element[0] : null;
        this.originalData = objective;
        this.id = objective ? objective.obj_id : null;
        this.errorMsg = '';
        this.errorDetails = '';
        this.pleaseSave = false;
        if (this.form) {
          this.updateForm(objective);
        } else {
          this.createForm(objective);
        }
      });
    this.route.data.pluck('data')
      .subscribe((data: DbMainmenu) => {
        this.viewId = data.mme_id;
        this.objectivesService.loadViewTopics(data.mme_content_id).subscribe(tops => {
          this.viewTopics = tops.map(t => ({ id: t.top_id, name: t.top_name }));
        });
      });

    this.dossiersService.loadDossiers(false, false, null)
      .subscribe(dossiers => this.dossiersList = dossiers.map(d => ({ id:d.dos_id, name: d.dos_lastname + " " + d.dos_firstname })));
  }

  ngAfterViewInit() {
    setTimeout(_ => this.getfocus.nativeElement.focus(), 0);
  }

  private createForm(data: ObjectiveJson) {
    this.titleCtrl = new FormControl(data ? data.obj_name : '');
    this.statusCtrl = new FormControl(data ? data.obj_status : '', Validators.required);
    this.startlineCtrl = new FormControl(data ? data.obj_start_date : '');
    this.deadlineCtrl = new FormControl(data ? data.obj_end_date : '');
    this.topicsCtrl = new FormControl(data ? data.topics ? data.topics.map(t => t.top_id) : [] : []);
    this.dossierCtrl = new FormControl(data ? data.dossier ? data.dossier.map(d => d.dos_id) : [] : []);
    this.form = this.fb.group({
      title: this.titleCtrl,
      status: this.statusCtrl,
      startlineDate: this.startlineCtrl,
      deadlineDate: this.deadlineCtrl,
      topics: this.topicsCtrl,
      dossier: this.dossierCtrl
    }, {
      validator: Validators.compose([ObjectiveComponent.objectivesDossiersValidator, ObjectiveComponent.objectiveHasRecipient])
    });
  }

  private updateForm(data: ObjectiveJson) {
    this.titleCtrl.setValue(data ? data.obj_name : '');
    this.statusCtrl.setValue(data ? data.obj_status : '');
    this.startlineCtrl.setValue(data ? data.obj_start_date : '');
    this.deadlineCtrl.setValue(data ? data.obj_end_date : '');
    this.topicsCtrl.setValue(data ? data.topics.map(t => t.top_id) : []);
    this.dossierCtrl.setValue(data ? data.dossier.map(d => d.dos_id) : []);
  }

  onSubmit() {
    if (!this.id) {
      this.service.addObjective(
        this.titleCtrl.value, this.statusCtrl.value, this.startlineCtrl.value, this.deadlineCtrl.value, this.topicsCtrl.value,
        this.dossierCtrl.value,
      ).subscribe(ret => {
        this.id = ret;
        this.goBackToList(true);
      },
        (err) => {
          this.errorMsg = 'Error while adding a objective';
          this.errorDetails = err.text();
        });
    } else {
      this.service.updateObjective(
        this.id, this.titleCtrl.value, this.statusCtrl.value, this.startlineCtrl.value, this.deadlineCtrl.value, this.topicsCtrl.value,
        this.dossierCtrl.value
      ).subscribe(ret => {
        this.goBackToList(true);
      },
        (err) => {
          this.errorMsg = 'Error while updating the objective';
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
    this.service.deleteObjective(this.id).subscribe(ret => {
      this.goBackToList();
    },
      (err) => {
        this.errorMsg = 'Error while deleting the objective';
        this.errorDetails = err.text();
      });
  }

  goBackToList(withSelected = false) {
    if (this.form) {
      this.form.reset();
    }

    if (withSelected) {
      this.router.navigate(['/main/' + this.viewId + '/objectives', { selobjective: this.id }])
    } else {
      this.router.navigate(['/main/' + this.viewId + '/objectives']);
    }
  }

  private isStatusDone() {
    if (this.statusCtrl.value == 'done') {
      return true;
    } else {
      return false;
    }
  }

  canDeactivate() {
    let ret = this.form.pristine;
    this.pleaseSave = !ret;
    return ret;
  }

}
