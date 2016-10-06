import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { TopicService } from '../topic.service';
import { DbTopic } from '../../../db-models/organ';
import { CanComponentDeactivate } from '../../../guards/can-deactivate.guard';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit, CanComponentDeactivate {

  id: number;
  creatingNew: boolean = false;

  form: FormGroup;
  nameCtrl: FormControl;
  descriptionCtrl: FormControl;
  iconCtrl: FormControl;
  colorCtrl: FormControl;

  originalData: DbTopic = { top_id: null, top_name: null, top_description: null, top_icon: null, top_color: null };
  pleaseSave: boolean = false;

  errorMsg: string = '';
  errorDetails: string = '';

  constructor(private route: ActivatedRoute, public router: Router,
    private fb: FormBuilder, public topicService: TopicService) { }

  ngOnInit() {
    this.nameCtrl = new FormControl('', Validators.required);
    this.descriptionCtrl = new FormControl('', Validators.required);
    this.iconCtrl = new FormControl('');
    this.colorCtrl = new FormControl('');
    this.form = this.fb.group({
      name: this.nameCtrl,
      description: this.descriptionCtrl,
      icon: this.iconCtrl,
      color: this.colorCtrl
    });

    this.route.data.forEach((data: { topic: DbTopic }) => {
      if ('topic' in data) {
        this.id = data.topic.top_id;
        this.creatingNew = false;
        this.nameCtrl.setValue(data.topic.top_name);
        this.descriptionCtrl.setValue(data.topic.top_description);
        this.iconCtrl.setValue(data.topic.top_icon);
        this.colorCtrl.setValue(data.topic.top_color);
      } else {
        this.creatingNew = true;
        this.nameCtrl.setValue('');
        this.descriptionCtrl.setValue('');
        this.iconCtrl.setValue('health');
        this.colorCtrl.setValue('#FFFFFF');
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

  doCancel() {
    this.setOriginalDataFromFields();
    this.goBackToList();
  }

  doDelete() {
    this.setOriginalDataFromFields();
    this.topicService.deleteTopic(this.id).subscribe(ret => {
      this.goBackToList();
    },
      (err) => {
        this.errorMsg = 'Error deleting topic';
        this.errorDetails = err.text();
      });
  }

  goBackToList(withSelected = false) {
    if (withSelected) {
      this.router.navigate(['/admin/topics', { selid: this.id }]);
    } else {
      this.router.navigate(['/admin/topics']);
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
    this.originalData.top_name = this.nameCtrl.value;
    this.originalData.top_description = this.descriptionCtrl.value;
    this.originalData.top_icon = this.iconCtrl.value;
    this.originalData.top_color = this.colorCtrl.value;
  }

  private originalDataChanged() {
    return this.originalData.top_name !== this.nameCtrl.value
      || this.originalData.top_description !== this.descriptionCtrl.value
      || this.originalData.top_icon !== this.iconCtrl.value
      || this.originalData.top_color !== this.colorCtrl.value;
  }
}
