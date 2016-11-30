import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MdInput } from '@angular/material';

import { ObjectivesViewsService } from '../objectives-views.service';
import { DbObjectivesviewGet } from '../../../db-models/objectives';
import { CanComponentDeactivate } from '../../../guards/can-deactivate.guard';
import { TopicService } from '../../../shared/topic.service';
import { ObjectivesService } from '../../../shared/objectives.service';

@Component({
  selector: 'app-objectives-views-form',
  templateUrl: './objectives-views-form.component.html',
  styleUrls: ['./objectives-views-form.component.css']
})
export class ObjectivesViewsFormComponent implements OnInit, AfterViewInit, CanComponentDeactivate {

  @ViewChild(MdInput) getfocus: MdInput;

  id: number;

  form: FormGroup;
  nameCtrl: FormControl;
  topicsCtrl: FormControl;

  topicsList: any[] = [];

  originalData: any = null;
  pleaseSave: boolean = false;

  errorMsg: string = '';
  errorDetails: string = '';

  constructor(private route: ActivatedRoute, public router: Router,
    private fb: FormBuilder, public service: ObjectivesViewsService,
    private topicService: TopicService, private objectivesService: ObjectivesService) { }

  ngOnInit() {

    this.topicService.loadTopics().subscribe(topics => {
      this.topicsList = topics.map(t => ({ id: t.top_id, name: t.top_name }));
    });

    this.route.data.pluck<DbObjectivesviewGet>('objectivesViews')
      .subscribe(element => {
        this.originalData = element;
        this.id = element ? element.obv_id : null;
        this.errorMsg = '';
        this.errorDetails = '';
        this.pleaseSave = false;
        if (this.form) {
          this.updateForm(element);
        } else {
          this.createForm(element);
        }
      });
  }
  ngAfterViewInit() {
    setTimeout(_ => this.getfocus.focus(), 0);
  }

  private createForm(data: DbObjectivesviewGet) {
    this.nameCtrl = new FormControl(data ? data.obv_name : '', Validators.required);
    this.topicsCtrl = new FormControl(data ? data.top_ids : []);
    this.form = this.fb.group({
      name: this.nameCtrl,
      topics: this.topicsCtrl
    });
  }

  private updateForm(data: DbObjectivesviewGet) {
    this.nameCtrl.setValue(data ? data.obv_name : '');
    this.topicsCtrl.setValue(data ? data.top_ids : []);
  }

  onSubmit() {
    if (!this.id) {
      this.service.addObjectivesViews(
        this.nameCtrl.value,
        this.topicsCtrl.value)
        .subscribe((ret: number) => {
          this.id = ret;
          this.goBackToList(true);
        },
        (err) => {
          this.errorMsg = 'Error adding objectives-views';
          this.errorDetails = err.text();
        });
    } else {
      this.service.updateObjectivesViews(
        this.id,
        this.nameCtrl.value,
        this.topicsCtrl.value)
        .subscribe(ret => {
          this.goBackToList(true);
        },
        (err) => {
          this.errorMsg = 'Error updating objectives-views';
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
    this.service.deleteObjectivesViews(this.id).subscribe(ret => {
      this.goBackToList();
    },
      (err) => {
        this.errorMsg = 'Error deleting objectives-views';
        this.errorDetails = err.text();
      });
  }

  goBackToList(withSelected = false) {
    if (this.form) {
      this.form.reset();
    }
    if (withSelected) {
      this.router.navigate(['/admin/objectives-views', { selid: this.id }]);
    } else {
      this.router.navigate(['/admin/objectives-views']);
    }
  }

  canDeactivate() {
    let ret = this.form.pristine;
    this.pleaseSave = !ret;
    return ret;
  }
}
