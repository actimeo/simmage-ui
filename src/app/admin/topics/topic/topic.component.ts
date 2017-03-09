import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CanComponentDeactivate } from '../../../services/guards/can-deactivate.guard';
import { DbTopic } from '../../../services/backend/db-models/organ';
import { SnackService } from '../../../services/utils/snack.service';
import { TopicService } from '../../../services/backend/topic.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit, AfterViewInit, CanComponentDeactivate {

  @ViewChild('getfocus') getfocus: ElementRef;

  id: number = null;

  form: FormGroup;
  nameCtrl: FormControl;
  descriptionCtrl: FormControl;
  iconCtrl: FormControl;
  colorCtrl: FormControl;

  originalData: DbTopic = null;
  pleaseSave: boolean = false;

  errorMsg: string = '';
  errorDetails: string = '';

  constructor(private route: ActivatedRoute, public router: Router,
    private fb: FormBuilder, public topicService: TopicService,
    private snackService: SnackService) { }

  ngOnInit() {
    this.route.data.pluck('topic')
      .subscribe((topic: DbTopic) => {
        this.originalData = topic;
        this.id = topic ? topic.top_id : null;
        this.errorMsg = '';
        this.errorDetails = '';
        this.pleaseSave = false;
        if (this.form) {
          this.updateForm(topic);
        } else {
          this.createForm(topic);
        }
      });
  }

  ngAfterViewInit() {
    setTimeout(_ => this.getfocus.nativeElement.focus(), 0);
  }

  private createForm(data: DbTopic) {
    this.nameCtrl = new FormControl(data ? data.top_name : '', Validators.required);
    this.descriptionCtrl = new FormControl(data ? data.top_description : '', Validators.required);
    this.iconCtrl = new FormControl(data ? data.top_icon : 'health');
    this.colorCtrl = new FormControl(data ? data.top_color : '#FFFFFF');
    this.form = this.fb.group({
      name: this.nameCtrl,
      description: this.descriptionCtrl,
      icon: this.iconCtrl,
      color: this.colorCtrl
    });
  }

  private updateForm(data: DbTopic) {
    this.nameCtrl.setValue(data ? data.top_name : '');
    this.descriptionCtrl.setValue(data ? data.top_description : '');
    this.iconCtrl.setValue(data ? data.top_icon : 'health');
    this.colorCtrl.setValue(data ? data.top_color : '#FFFFFF');
  }

  onSubmit() {
    if (!this.id) {
      this.topicService.addTopic(this.nameCtrl.value, this.descriptionCtrl.value, this.iconCtrl.value, this.colorCtrl.value)
        .subscribe((ret: number) => {
          this.id = ret;
          this.goBackToList(true);
        },
        (err) => {
          this.errorMsg = 'Error adding topic';
          this.errorDetails = err.text();
        });
    } else {
      this.topicService.updateTopic(this.id, this.nameCtrl.value, this.descriptionCtrl.value, this.iconCtrl.value, this.colorCtrl.value)
        .subscribe(ret => {
          this.goBackToList(true);
        },
        (err) => {
          this.errorMsg = 'Error updating topic';
          this.errorDetails = err.text();
        });
    }
  }

  doReset() {
    this.createForm(this.originalData);
    this.pleaseSave = false;
  }

  doCancel() {
    this.goBackToList();
  }

  doDelete() {
    this.topicService.deleteTopic(this.id).subscribe(ret => {
      this.snackService.message({
        message: 'Topic "' + this.nameCtrl.value + '" deleted',
        action: 'ok'
      });
      this.goBackToList();
    },
      (err) => {
        this.errorMsg = 'Error deleting topic';
        this.errorDetails = err.text();
      });
  }

  goBackToList(withSelected = false) {
    if (this.form) {
      this.form.reset();
    }
    if (withSelected) {
      this.router.navigate(['/admin/topics', { selid: this.id }]);
    } else {
      this.router.navigate(['/admin/topics']);
    }
  }

  canDeactivate() {
    let ret = this.form.pristine;
    this.pleaseSave = !ret;
    return ret;
  }
}
