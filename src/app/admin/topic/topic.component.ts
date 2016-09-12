import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { TopicService } from '../../db-services/topic.service';
import { DbTopic } from '../../db-models/organ';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit, OnDestroy {

  routeSubs: Subscription = null;
  id: number;
  creatingNew: boolean = false;

  form: FormGroup;
  nameCtrl: FormControl;
  descriptionCtrl: FormControl;

  topicSubs: Subscription = null;

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
    if (this.creatingNew) {
      this.topicService.addTopic(this.nameCtrl.value, this.descriptionCtrl.value)
        .subscribe(ret => {
          this.goBackToList();
        });
    } else {
      this.topicService.updateTopic(this.id, this.nameCtrl.value, this.descriptionCtrl.value)
        .subscribe(ret => {
          this.goBackToList();
        });
    }
  }

  doCancel() {
    this.goBackToList();
  }

  doDelete() {
    this.topicService.deleteTopic(this.id).subscribe(ret => {
      this.goBackToList();
    });
  }

  private goBackToList() {
    this.router.navigate(['/admin/topics']);
  }
}
