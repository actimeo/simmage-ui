import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CanComponentDeactivate } from '../../../services/guards/can-deactivate.guard';
import { DbObjectivesviewGet } from '../../../services/backend/db-models/objectives';
import { ObjectivesService } from '../../../services/backend/objectives.service';
import { ObjectivesViewsService } from '../objectives-views.service';
import { TopicService } from '../../../services/backend/topic.service';

@Component({
  selector: 'app-objectives-views-form',
  templateUrl: './objectives-views-form.component.html',
  styleUrls: ['./objectives-views-form.component.css']
})
export class ObjectivesViewsFormComponent implements OnInit, AfterViewInit, CanComponentDeactivate {

  @ViewChild('getfocus') getfocus: ElementRef;

  id: number;

  form: FormGroup;
  nameCtrl: FormControl;
  topicsCtrl: FormControl;

  topicsList: any[] = [];

  originalData: any = null;
  pleaseSave = false;

  errorMsg = '';
  errorDetails = '';

  constructor(private route: ActivatedRoute, public router: Router,
    private fb: FormBuilder, public service: ObjectivesViewsService,
    private topicService: TopicService, private objectivesService: ObjectivesService) { }

  ngOnInit() {

    this.topicService.loadTopics().subscribe(topics => {
      this.topicsList = topics.map(t => ({ id: t.top_id, name: t.top_name }));
    });

    this.route.data.pluck('objectivesViews')
      .subscribe((element: DbObjectivesviewGet) => {
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
    setTimeout(_ => this.getfocus.nativeElement.focus(), 0);
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
    const ret = this.form.pristine;
    this.pleaseSave = !ret;
    return ret;
  }
}
