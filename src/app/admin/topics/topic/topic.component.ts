import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { TopicService } from '../../../db-services/topic.service';
import { DbTopic } from '../../../db-models/organ';
import { CanComponentDeactivate } from '../../../guards/can-deactivate.guard';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  routeSubs: Subscription = null;
  id: number;
  creatingNew: boolean = false;

  form: FormGroup;
  nameCtrl: FormControl;
  descriptionCtrl: FormControl;

  topicSubs: Subscription = null;

  originalData: DbTopic = { top_id: null, top_name: null, top_description: null };
  pleaseSave: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router,
    private fb: FormBuilder, private topicService: TopicService) { }

  ngOnInit() {
    this.nameCtrl = new FormControl('', Validators.required);
    this.descriptionCtrl = new FormControl('', Validators.required);
    this.form = this.fb.group({
      name: this.nameCtrl,
      description: this.descriptionCtrl
    });

    this.route.data.forEach((data: { topic: DbTopic }) => {
      if ('topic' in data) {
        this.id = data.topic.top_id;
        this.creatingNew = false;
        this.nameCtrl.setValue(data.topic.top_name);
        this.descriptionCtrl.setValue(data.topic.top_description);
      } else {
        this.creatingNew = true;
        this.nameCtrl.setValue('');
        this.descriptionCtrl.setValue('');
      }
      this.setOriginalDataFromFields();
    });
  }

  ngOnDestroy() {
    if (this.routeSubs) {
      this.routeSubs.unsubscribe();
    }
    if (this.topicSubs) {
      this.topicSubs.unsubscribe();
    }
  }

  onSubmit() {
    this.setOriginalDataFromFields();
    if (this.creatingNew) {
      this.topicService.addTopic(this.nameCtrl.value, this.descriptionCtrl.value)
        .subscribe((ret: number) => {
          this.id = ret;
          this.goBackToList(true);
        });
    } else {
      this.topicService.updateTopic(this.id, this.nameCtrl.value, this.descriptionCtrl.value)
        .subscribe(ret => {
          this.goBackToList(true);
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
    });
  }

  private goBackToList(withSelected = false) {
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
  }

  private originalDataChanged() {
    return this.originalData.top_name !== this.nameCtrl.value
      || this.originalData.top_description !== this.descriptionCtrl.value;
  }
}
