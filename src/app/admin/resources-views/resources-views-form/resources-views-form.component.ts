import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MdInput } from '@angular/material';

import { ResourcesViewsService } from '../resources-views.service';
import { DbResourcesviewGet } from '../../../db-models/resources';
import { CanComponentDeactivate } from '../../../guards/can-deactivate.guard';
import { TopicService } from '../../../shared/topic.service';
import { ResourcesService } from '../../../shared/resources.service';

@Component({
  selector: 'app-resources-views-form',
  templateUrl: './resources-views-form.component.html',
  styleUrls: ['./resources-views-form.component.css']
})
export class ResourcesViewsFormComponent implements OnInit, AfterViewInit, CanComponentDeactivate {

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
    private fb: FormBuilder, public service: ResourcesViewsService,
    private topicService: TopicService, private resourcesService: ResourcesService) { }

  ngOnInit() {

    this.topicService.loadTopics().subscribe(topics => {
      this.topicsList = topics.map(t => ({ id: t.top_id, name: t.top_name }));
    });

    this.route.data.pluck<DbResourcesviewGet>('resourcesViews')
      .subscribe(element => {
        this.originalData = element;
        this.id = element ? element.rev_id : null;
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

  private createForm(data: DbResourcesviewGet) {
    this.nameCtrl = new FormControl(data ? data.rev_name : '', Validators.required);
    this.topicsCtrl = new FormControl(data ? data.top_ids : []);
    this.form = this.fb.group({
      name: this.nameCtrl,
      topics: this.topicsCtrl
    });
  }

  private updateForm(data: DbResourcesviewGet) {
    this.nameCtrl.setValue(data ? data.rev_name : '');
    this.topicsCtrl.setValue(data ? data.top_ids : []);
  }

  onSubmit() {
    if (!this.id) {
      this.service.addResourcesViews(
        this.nameCtrl.value,
        this.topicsCtrl.value)
        .subscribe((ret: number) => {
          this.id = ret;
          this.goBackToList(true);
        },
        (err) => {
          this.errorMsg = 'Error adding resources-views';
          this.errorDetails = err.text();
        });
    } else {
      this.service.updateResourcesViews(
        this.id,
        this.nameCtrl.value,
        this.topicsCtrl.value)
        .subscribe(ret => {
          this.goBackToList(true);
        },
        (err) => {
          this.errorMsg = 'Error updating resources-views';
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
    this.service.deleteResourcesViews(this.id).subscribe(ret => {
      this.goBackToList();
    },
      (err) => {
        this.errorMsg = 'Error deleting resources-views';
        this.errorDetails = err.text();
      });
  }

  goBackToList(withSelected = false) {
    if (this.form) {
      this.form.reset();
    }
    if (withSelected) {
      this.router.navigate(['/admin/resources-views', { selid: this.id }]);
    } else {
      this.router.navigate(['/admin/resources-views']);
    }
  }

  canDeactivate() {
    let ret = this.form.pristine;
    this.pleaseSave = !ret;
    return ret;
  }
}
